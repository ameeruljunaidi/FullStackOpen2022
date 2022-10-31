const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })

    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)

    response.json(user)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!username)
        return response.status(400).json({
            error: 'Missing username',
        })

    if (username.length < 3)
        return response.status(400).json({
            error: 'Username must at least 3 characters long',
        })

    const existingUser = await User.findOne({ username })
    if (existingUser)
        return response.status(400).json({
            error: 'Username must be unique',
        })

    if (!password)
        return response.status(400).json({
            error: 'Missing password',
        })

    if (password.length < 3)
        return response.status(400).json({
            error: 'Password must at least 3 characters long',
        })

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.delete('/', async (_, response) => {
    await User.deleteMany({})
    response.status(200).end()
})

module.exports = usersRouter
