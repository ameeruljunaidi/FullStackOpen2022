const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('person', (request, _) => {
    if (request.method === 'POST') return JSON.stringify(request.body)
    return null
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(cors())

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456',
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523',
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345',
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
    },
]

app.get('/', (_, response) => {
    response.send('<h1/>This is the phonebook app</h1>')
})

app.get('/info', (_, response) => {
    const countPerson = persons.length
    const dateNow = new Date()
    const text = `<div>Phonebook has info for ${countPerson} people</div> 
                  <div>${dateNow}</div>`
    response.send(text)
})

app.get('/api/phonebook', (_, response) => {
    response.json(persons)
})

app.get('/api/phonebook/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id == id)

    if (!person) response.status(404).end()
    response.json(person)
})

app.delete('/api/phonebook/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id != id)

    response.status(204).end()
})

const getRandomId = () => {
    const max = 1000
    const getRandomId = () => Math.floor(Math.random() * max)
    const findIdInPhoneBook = idToFind => persons.find(person => person.id == idToFind)

    let randomId = getRandomId()

    while (findIdInPhoneBook(randomId)) {
        randomId = getRandomId
    }

    return randomId
}

app.post('/api/phonebook', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'person name or number is missing',
        })
    }

    const personFound = persons.find(person => person.name === body.name)

    if (personFound) {
        return response.status(400).json({
            error: 'name must be unique',
        })
    }

    const person = {
        id: getRandomId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
