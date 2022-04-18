const mongoose = require('mongoose')

const argumentLength = process.argv.length
const errorMessage = `Please provide the password, [name], and [number] as argument: \
node mongo.js <password> <name> <number>`

const showErrorAndExit = () => {
    console.log(errorMessage)
    process.exit(1)
}

if (argumentLength < 3) {
    showErrorAndExit()
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.uzl3j.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const printEveryone = () => {
    Person.find({}).then(result => {
        result.forEach(person => console.log(person))
        mongoose.connection.close()
    })
}

const addNewPerson = (newName, newNumber) => {
    const person = new Person({
        name: newName,
        number: newNumber,
    })

    person.save().then(_ => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}

if (argumentLength == 3) {
    printEveryone()
} else if (argumentLength == 5) {
    const newName = process.argv[3]
    const newNumber = process.argv[4]

    addNewPerson(newName, newNumber)
} else {
    showErrorAndExit()
}
