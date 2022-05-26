const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blogFound = await Blog.findById(request.params.id)
    if (blogFound) response.json(blogFound)
    else response.status(404).end()
})

blogsRouter.post('/', async (request, response) => {
    const requestBlog = request.body

    const blog = new Blog({
        title: requestBlog.title,
        author: requestBlog.author,
        url: requestBlog.url,
        likes: requestBlog.likes ? requestBlog.likes : 0
    })

    const result = await blog.save()
    response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
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