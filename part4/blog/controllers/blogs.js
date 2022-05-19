const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    await response.send('This is the blog app.')
})

blogsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/api/blogs/:id', async (request, response) => {
    const blogFound = await Blog.findById(request.params.id)
    if (blogFound) response.json(blogFound)
    else response.status(400).end()
})

blogsRouter.post('/api/blogs', async (request, response) => {
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

blogsRouter.delete('/api/blogs/', async (request, response) => {
    await Blog.deleteMany({})
    response.status(204).end()
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter