import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/person'
import Notification from './components/Notification'
import './index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setFilterValue] = useState('')
    const [filteredPersons, setFilteredPersons] = useState([])
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(true)

    useEffect(() => {
        personService.getAll().then(retrievedPersons => setPersons(retrievedPersons))
    }, [])

    useEffect(() => {
        setFilteredPersons(persons)
    }, [persons])

    const handleNameChange = event => setNewName(event.target.value)

    const handleNumberChange = event => setNewNumber(event.target.value)

    const addNumber = event => {
        event.preventDefault()
        const existingPerson = persons.find(person => person.name === newName)

        if (existingPerson) {
            const message = `${newName} is already to phonebook, replace the old number with a new one?`
            const updated = { ...existingPerson, number: newNumber }

            if (!window.confirm(message)) return

            personService
                .update(updated.id, updated)
                .then(retrievedPerson => {
                    setPersons(
                        persons.map(person => {
                            return person.id !== updated.id ? person : retrievedPerson
                        })
                    )
                })
                .catch(error => {
                    setNotificationMessage(error.response.data.error)
                    setSuccessMessage(false)
                    setTimeout(() => setNotificationMessage(null), 5000)
                })
        } else {
            const newNameObject = { name: newName, number: newNumber, id: persons.length + 1 }

            personService
                .create(newNameObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setFilteredPersons(persons)
                    setNewName('')
                    setNewNumber('')
                    setFilterValue('')
                    setSuccessMessage(true)
                    setNotificationMessage(`Added ${returnedPerson['name']}`)
                    setTimeout(() => setNotificationMessage(null), 5000)
                })
                .catch(error => {
                    setSuccessMessage(false)
                    setNotificationMessage(error.response.data.error)
                    setTimeout(() => setNotificationMessage(null), 5000)
                })
        }
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
        setFilterValue(event.target.value)
    }

    const handleDelete = personId => () => {
        const person = persons.find(person => person.id === personId)

        if (!window.confirm(`Delete ${person.name}?`)) return

        personService
            .remove(personId)
            .then(() => {
                setPersons(persons.filter(person => person.id !== personId))
            })
            .catch(() => {
                setNotificationMessage(`Information of ${person.name} has already been removed from server`)
                setSuccessMessage(false)
                setTimeout(() => setNotificationMessage(null), 5000)
                setPersons(persons.filter(person => person.id !== personId))
            })
    }

    return (
        <>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} success={successMessage} />
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
            <Persons persons={filteredPersons} handleDelete={handleDelete} />
        </>
    )
}

export default App
