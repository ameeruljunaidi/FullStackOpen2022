require('dotenv').config()

const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose
    .connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    number: {
        type: String,
        minlength: 8,
        required: true,
        validate: {
            validator: numberInput => /^\d{2,3}-\d{5,}$/.test(numberInput),
            message: ({ value }) => `${value} is not a valid phone number`,
        },
    },
})

personSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Person', personSchema)
