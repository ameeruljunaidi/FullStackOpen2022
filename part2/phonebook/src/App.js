import { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = ({persons}) => (
    <>
        {persons.map(person => (
            <p key={person.id}>
                {person.name} {person.number}
            </p>
        ))}
    </>
)

function Filter({filterValue, onChange}) {
    return (
        <form>
            <div>
                filter shown with
                <input value={filterValue} onChange={onChange} />
            </div>
        </form>
    )
}

function PersonForm({name, number, onNameChange, onNumberChange, onSubmit}) {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name:
                <input value={name} onChange={onNameChange} />
            </div>
            <div>
                number:
                <input value={number} onChange={onNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setFilterValue] = useState('')
    const [filteredPersons, setFilteredPersons] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(result => {
                setPersons(result.data)
            })
    }, [])

    useEffect(() => {
        setFilteredPersons(persons)
    }, [persons])

    const handleNameChange = event => setNewName(event.target.value)

    const handleNumberChange = event => setNewNumber(event.target.value)

    const addNumber = event => {
        event.preventDefault()
        const newNameObject = {name: newName, number: newNumber, id: persons.length + 1}
        const alreadyExist = persons.find(person => person.name === newName)

        if (alreadyExist) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat(newNameObject))
        }

        setFilteredPersons(persons)
        setNewName('')
        setNewNumber('')
        setFilterValue('')
    }

    const handleFilterChange = event => {
        event.preventDefault()

        if (event.target.value === '') {
            setFilteredPersons(persons)
        } else {
            setFilteredPersons(
                persons.filter(person => {
                    const personName = person.name.toLowerCase()
                    const toCompare = filterValue.toLowerCase()
                    return personName.includes(toCompare)
                })
            )
        }

        setFilterValue(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterValue={filterValue} onChange={handleFilterChange} />
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
