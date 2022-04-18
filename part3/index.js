const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/person')

morgan.token('person', (request, _) => {
    if (request.method === 'POST') return JSON.stringify(request.body)
    return null
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(cors())
app.use(express.static('build'))

app.get('/', (_, response) => {
    response.send('<h1/>This is the phonebook app</h1>')
})

app.get('/info', (_, response) => {
    Person.find({}).then(people => {
        const countPerson = people.length
        const dateNow = new Date()
        const text = `<div>Phonebook has info for ${countPerson} people</div> 
                  <div>${dateNow}</div>`
        response.send(text)
    })
})

app.get('/api/phonebook', (_, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/api/phonebook/:id', (request, response, next) => {
    const id = request.params.id

    Person.findById(id)
        .then(person => response.json(person))
        .catch(error => next(error))
})

app.delete('/api/phonebook/:id', (request, response, next) => {
    const id = request.params.id

    Person.findByIdAndDelete(id)
        .then(_ => response.status(204).end())
        .catch(error => next(error))
})

app.post('/api/phonebook', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person
        .save()
        .then(savedPerson => response.json(savedPerson))
        .catch(error => next(error))
})

app.put('/api/phonebook/:id', (request, response, next) => {
    const id = request.params.id
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' })
        .then(_ => response.json(body))
        .catch(error => next(error))
})

const unknownEndpoint = (_, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
