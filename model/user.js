const { MongoServerClosedError } = require('mongodb')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    token: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)