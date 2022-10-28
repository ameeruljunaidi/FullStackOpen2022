const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({

    // Requirements:
    // 1. Both username and password must be given
    // 2. Both username and password must be at least 3 characters long
    // 3. The username must be unique

    username: { type: String, required: true, min: 3, unique: true, uniqueCaseInsensitive: true },
    name: String,
    passwordHash: { type: String, required: true, min: 3 },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)


