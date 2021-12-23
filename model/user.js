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
    myMateId: {
        type: String
    },
    roomMates: [
        {
            firstName: {
                type: String
            }, lastName: {
                type: String
            }, email: {
                type: String
            }, mateId: {
                type: String
            }, status: {
                type: String,
                enum: ['PENDING', 'APPROVED'],
                default: 'PENDING'
            }
        }
    ],
    token: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)