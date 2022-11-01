const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = require('./test_data').listWithManyBlogs
const User = require('../models/user')
const { getUser } = require('./test_helper')

beforeEach(async () => {
    await User.deleteMany({})

    const user = new User({
        username: 'initial-username',
        name: 'initial-name',
        passwordHash: 'random-password',
    })

    await user.save()

    await Blog.deleteMany({})

    const userId = helper.getUserIdFromDb()
    const blogList = initialBlogs
        .map(blog => ({ ...blog, userId: userId }))
        .map(blog => new Blog(blog))
    const blogPromises = blogList.map(blogPromise => blogPromise.save())
    await Promise.all(blogPromises)
})

describe('When there is initially some blogs saved', () => {
    test('blogs are returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)

        expect(contents).toContain('React patterns')
    })

    test('verify unique id is named id and not _id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const firstBlog = blogsAtStart[0]

        expect(firstBlog.id).toBeDefined()
    })
})

describe('Viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
        const blogAtStart = await helper.blogsInDb()
        const blogToView = blogAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
        expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('fails with status code 404 is note does not exist', async () => {
        const nonExistingId = await helper.nonExistingId()

        await api.get(`/api/blogs/${nonExistingId}`).expect(404)
    })
})

describe('Addition of a new blog', () => {
    test('fails if no token is provided', async () => {
        const newBlog = {
            title: 'random-title',
            author: 'random-author',
            url: 'https://random-url.random',
            likes: 27,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('succeeds with valid data', async () => {
        const user = await getUser()
        const userId = user.id

        const newBlog = {
            title: 'Charlie and The Chocolate Factory',
            author: 'John Travolta',
            url: 'https://www.google.com',
            likes: 27,
            userId: userId,
        }

        const token = await helper.getToken()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const contents = blogsAtEnd.map(r => r.title)

        expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
        expect(contents).toContain('Charlie and The Chocolate Factory')
    })

    test('with likes property missing, will default to 0', async () => {
        const user = await getUser()
        const userId = user.id

        const newBlog = {
            title: 'This object has no likes :(',
            author: 'The Likeless Monster',
            url: 'https://ihavenolikes.aww',
            userId: userId,
        }

        const token = await helper.getToken()

        const result = await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(result.body.likes).toBeDefined()
        expect(result.body.likes).toBe(0)
    })

    test('without title and url return 400 bad request', async () => {
        const user = await getUser()
        const userId = user.id

        const newBlog = {
            author: 'John Travolta',
            likes: 27,
            userId: userId,
        }

        const token = await helper.getToken()

        await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${token}`).expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    })
})

describe('Deletion of a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const user = await getUser()
        const blogToDelete = blogsAtStart[0]
        await Blog.findByIdAndUpdate(blogToDelete.id, { user: user.id })
        await User.findByIdAndUpdate(user.id, { blogs: [blogToDelete.id] })

        const token = await helper.getToken()

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const blogTitles = blogsAtEnd.map(blog => blog.title)

        expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
        expect(blogTitles).not.toContain(blogToDelete.title)
    })

    test('fails with status code 404 if note does not exist', async () => {
        const nonExistingId = await helper.nonExistingId()

        const token = await helper.getToken()

        await api
            .delete(`/api/blogs/${nonExistingId}`)
            .set('Authorization', `bearer ${token}`)
            .expect(404)
    })
})

describe('Updating of a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const token = await helper.getToken()

        const updatedBlog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: 999,
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set('Authorization', `bearer ${token}`)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogAtEnd = await helper.blogsInDb()
        const likes = blogAtEnd.map(blog => blog.likes)

        expect(blogAtEnd).toHaveLength(initialBlogs.length)
        expect(likes).toContain(999)
    })

    test('fails with status code 400 if code does not exist', async () => {
        const nonExistingId = helper.nonExistingId()
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const token = await helper.getToken()

        await api
            .put(`/api/blogs/${nonExistingId}`)
            .set('Authorization', `bearer ${token}`)
            .send(blogToUpdate).expect(400)
    })
})

afterAll(() => mongoose.connection.close())
