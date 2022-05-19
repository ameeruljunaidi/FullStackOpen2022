const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = require('./test_data').listWithManyBlogs

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogsPromises = initialBlogs
        .map((blog) => new Blog(blog))
        .map((blogPromise) => blogPromise.save())
    await Promise.all(blogsPromises)
})

test('Blogs are returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('A specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)

    expect(contents).toContain('React patterns')
})

test('A specific blog can be viewed', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToView = blogAtStart[0]

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedBlogToView)
})

test('A valid blog can be added', async () => {
    const newBlog = {
        title: 'Charlie and The Chocolate Factory',
        author: 'John Travolta',
        url: 'https://www.google.com',
        likes: 27,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(r => r.title)

    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain('Charlie and The Chocolate Factory')
})

test('Blog without title is not added', async () => {
    const newBlog = {
        author: 'John Travolta',
        url: 'https://www.google.com',
        likes: 27,
    }

    await api
        .post('/api/nlogs')
        .send(newBlog)
        .expect(404)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
})

test('A specific blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const noteToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${noteToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const blogTitles = blogsAtEnd.map(blog => blog.title)

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
    expect(blogTitles).not.toContain(noteToDelete.title)
})

afterAll(() => mongoose.connection.close())