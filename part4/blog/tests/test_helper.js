const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', url: 'thisisnotaurl' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
}

const usersInDb = async () => {
    const users = await User.find()
    return users.map(user => user.toJSON())
}

const getUser = async () => {
    const users = await usersInDb()
    return users[0]
}

const getUserIdFromDb = async () => {
    const users = await usersInDb()
    const user = users[0]
    return user.id
}

const getToken = async () => {
    const user = await getUser()
    return jwt.sign({ id: user.id }, process.env.SECRET)
}

const dummyUser = async () => {
    const user = await Blog.find({})[0]
    return user
}

module.exports = {
    nonExistingId,
    blogsInDb,
    usersInDb,
    dummyUser,
    getUser,
    getUserIdFromDb,
    getToken
}