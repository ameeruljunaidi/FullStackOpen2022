const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/Blog')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

beforeEach(async () => {
    await User.deleteMany({})

    const saltRounds = 10
    const password = 'this-is-a-password'
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username: 'initial-username',
        name: 'initial-name',
        passwordHash: passwordHash
    })

    await user.save()
})

describe('When there is initially one user in db', () => {

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const freshUser = {
            username: 'fresh-username',
            name: 'fresh-name',
            password: 'this-is-a-fresh-password'
        }

        await api
            .post('/api/users')
            .send(freshUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(freshUser.username)
    })

    test('creation fails if username and/or password is not given', async () => {
        const usersAtStart = await helper.usersInDb()

        const noUsername = {
            name: 'some-name',
            password: 'some-password'
        }

        const noUsernameResult = await api
            .post('/api/users')
            .send(noUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(noUsernameResult.body.error).toContain('Missing username')

        const noPassword = {
            username: 'some-username',
            name: 'some-name'
        }

        const noPasswordResult = await api
            .post('/api/users')
            .send(noPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(noPasswordResult.body.error).toContain('Missing password')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if username and/or password is less than 3 characters long', async () => {
        const usersAtStart = await helper.usersInDb()

        const invalidUsername = {
            username: 'ab',
            name: 'some-name',
            password: 'some-password'
        }

        const invalidUsernameResult = await api
            .post('/api/users')
            .send(invalidUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(invalidUsernameResult.body.error).toContain('Username must at least 3 characters long')

        const invalidPassword = {
            username: 'some-username',
            name: 'some-name',
            password: 'ab'
        }

        const invalidPasswordResult = await api
            .post('/api/users')
            .send(invalidPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(invalidPasswordResult.body.error).toContain('Password must at least 3 characters long')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with a non-unique username', async () => {
        const usersAtStart = await helper.usersInDb()

        const duplicateUsername = {
            username: 'initial-username',
            name: 'initial-name',
            password: 'some-password'
        }

        const result = await api
            .post('/api/users')
            .send(duplicateUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

describe('When adding blogs with user data', () => {
    test('includes the user id if included', async () => {
        const userAtStart = await helper.usersInDb()
        const selectedUser = userAtStart[0]
        const userId = selectedUser.id

        const blog = {
            title: 'Top Gun',
            author: 'Tom Cruise',
            url: 'https://www.tomcruise.com',
            likes: 234,
            userId: userId
        }

        const token = jwt.sign({ id: userId }, process.env.SECRET)

        const result = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        const userAtEnd = usersAtEnd[0]
        const userAtEndBlogs = userAtEnd.blogs
        // const blogsAtEnd = await helper.blogsInDb()
        // const blogsUsers = blogsAtEnd.map(blog => blog.user)

        expect(userAtEndBlogs).toHaveLength(1)
        expect(userAtEndBlogs[0].toString()).toContain(result._body.id)
    })
})

afterAll(() => mongoose.connection.close())
