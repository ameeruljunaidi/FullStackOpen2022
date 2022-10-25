const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blogFound = await Blog
        .findById(request.params.id)
        .populate('user', { username: 1, name: 1 })

    if (blogFound) response.json(blogFound)
    else response.status(404).end()
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(body.userId)

    const blog = user
        ? new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes ? body.likes : 0,
            user: user
        })
        : new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes ? body.likes : 0,
        })

    const result = await blog.save()

    if (user) {
        user.blogs = user.blogs.concat(blog._id)
        await user.save()
    }

    response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user
    }

    try {
        const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        if (result) response.status(200).json(result)
        else response.status(404).end()
    } catch (e) {
        next(e)
    }
})

blogsRouter.delete('/', async (request, response) => {
    await Blog.deleteMany({})
    response.status(200).end()
})

blogsRouter.delete('/:id', async (request, response) => {
    const result = await Blog.findByIdAndRemove(request.params.id)
    if (!result) response.status(404).end()
    else response.status(200).end()
})

module.exports = blogsRouter