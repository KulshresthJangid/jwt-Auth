const { rejects } = require('assert')
const mongoose = require('mongoose')
const User = require('../model/user')

function findUser (myMateId) {
    const users = User.find({ myMateId })
    console.log("There is the users-------",users)
    return users
    
}

module.exports = {
    findUser
}