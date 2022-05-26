const loginRouter = require('express').Router()

loginRouter.get('/', (request, response) => {
    response.send('This is the login router')
})

module.exports = loginRouter
