const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    await response.send('This is the blog app.')
})

blogsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/api/blogs', async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
})

blogsRouter.delete('/api/blogs/', async (request, response, next) => {
    try {
        await Blog.deleteMany({})
        response.status(204).end()
    } catch (e) {
        next(e)
    }
})

module.exports = blogsRouter