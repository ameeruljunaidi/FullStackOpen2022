const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

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

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    const blog = user ? new Blog({
        title: body.title, author: body.author, url: body.url, likes: body.likes ? body.likes : 0, user: user
    }) : new Blog({
        title: body.title, author: body.author, url: body.url, likes: body.likes ? body.likes : 0,
    })

    const result = await blog.save()

    if (user) {
        user.blogs = user.blogs.concat(blog._id)
        await user.save()
    }

    response.status(201).json(result)
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user
    }

    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    if (result) response.status(200).json(result)
    else response.status(404).end()
})

blogsRouter.delete('/', async (request, response) => {
    await Blog.deleteMany({})
    response.status(200).end()
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const result = await Blog.findByIdAndRemove(request.params.id)
    if (!result) response.status(404).end()
    else response.status(200).end()
})

module.exports = blogsRouter