const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
require('express-async-errors')
const middleware = require('./utils/middleware')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

logger.info('Connecting to: ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI).then(() => {
    logger.info('Connected to MongoDB')
}).catch(error => {
    logger.info('Error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
