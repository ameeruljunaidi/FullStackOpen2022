import { useState } from 'react'

const Persons = ({ persons }) => (
    <>
        {persons.map(person => (
            <p key={person.id}>
                {person.name} {person.number}
            </p>
        ))}
    </>
)

function Filter(props) {
    return (
        <form>
            <div>
                filter shown with
                <input onChange={props.onChange} />
            </div>
        </form>
    )
}

function PersonForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                name:
                <input value={props.name} onChange={props.onNameChange} />
            </div>
            <div>
                number:
                <input value={props.number} onChange={props.onNumberChange} />
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filteredPersons, setFilteredPersons] = useState(persons)

    const handleNameChange = event => setNewName(event.target.value)

    const handleNumberChange = event => setNewNumber(event.target.value)

    const addNumber = event => {
        console.log('adding number')
        event.preventDefault()
        const newNameObject = { name: newName, number: newNumber, id: persons.length + 1 }
        const alreadyExist = persons.find(person => person.name === newName)

        if (alreadyExist) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat(newNameObject))
        }

        setFilteredPersons(persons)
        setNewName('')
        setNewNumber('')
    }

    const handleFilterChange = event => {
        event.preventDefault()
        if (event.target.value === '') {
            setFilteredPersons(persons)
        } else {
            setFilteredPersons(
                persons.filter(person => {
                    const personName = person.name.toLowerCase()
                    const toCompare = event.target.value.toLowerCase()
                    return personName.includes(toCompare)
                })
            )
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm
                onSubmit={addNumber}
                name={newName}
                onNameChange={handleNameChange}
                number={newNumber}
                onNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={filteredPersons} />
        </div>
    )
}

export default App
