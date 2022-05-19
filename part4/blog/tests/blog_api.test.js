const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = require('./test_data').listWithManyBlogs

describe('Blog API testing', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogsPromises = initialBlogs
            .map((blog) => new Blog(blog))
            .map((blogPromise) => blogPromise.save())
        await Promise.all(blogsPromises)
    })

    test('blogs are returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('verify unique id is named id and not _id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const firstBlog = blogsAtStart[0]

        expect(firstBlog.id).toBeDefined()
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)

        expect(contents).toContain('React patterns')
    })

    test('a specific blog can be viewed', async () => {
        const blogAtStart = await helper.blogsInDb()
        const blogToView = blogAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
        expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('a valid blog can be added', async () => {
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

    test('if likes property is missing, it will default to 0', async () => {
        const newBlog = {
            title: 'This object has no likes :(',
            author: 'The Likeless Monster',
            url: 'https://ihavenolikes.aww',
        }

        const result = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(result.body.likes).toBeDefined()
        expect(result.body.likes).toBe(0)
    })

    test('blog without title and url return 400 bad request', async () => {
        const newBlog = {
            author: 'John Travolta',
            likes: 27,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    })

    test('a specific blog can be deleted', async () => {
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
})