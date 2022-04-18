const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

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

app.get('/api/phonebook/:id', (request, response) => {
    const id = request.params.id
    Person.findById(id)
        .then(person => {
            response.json(person)
        })
        .catch(_ => {
            response.status(404).end()
        })
})

app.delete('/api/phonebook/:id', (request, response) => {
    const id = request.params.id

    Person.findByIdAndDelete(id)
        .then(_ => {
            response.status(204).end()
            console.log('deleted person')
        })
        .catch(_ => {
            response.status(404).end()
            console.log('deleting failed')
        })
})

app.post('/api/phonebook', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'person name or number is missing',
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.put('/api/phonebook/:id', (request, response) => {
    const id = request.params.id
    const body = request.body

    Person.findByIdAndUpdate(id, body)
        .then(_ => {
            response.json(body)
            console.log('updated person')
        })
        .catch(_ => {
            response.status(404).end()
            console.log('updating failed')
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
