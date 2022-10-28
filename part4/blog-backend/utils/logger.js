const testing = process.env.NODE_ENV === 'test'

const info = (...params) => {
    // If log during testing, it would mess with the test output
    if (!testing) console.log(...params)
}

const error = (...params) => {
    // If log during testing, it would mess with the test output
    if (!testing) console.error(...params)
}

module.exports = {
    info, error
}