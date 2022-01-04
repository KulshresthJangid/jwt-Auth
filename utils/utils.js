const { rejects } = require('assert')
const mongoose = require('mongoose')
const User = require('../model/user')

function findUser (myMateId) {
    const users = User.find({ myMateId })
    // console.log("There is the users-------",users)rs
    return users   
}


// async function sendMateRequest(myMateId) {
//     let obj = {
//         myMateId,
//         requestStatus: 'PENDING'
//     }
//     User.findOne({ myMateId }).then((result) => {
//         let userArr = result.roomMates
//         userArr.push(obj)
//         console.log(userArr)
//     })
    
//     // console.log("---------here is the obj",user)
// }

async function saveTheUserRecievedRequest(id, obj) {
    await User.findOne({ myMateId: id}).then((result) => {
        console.log("user found", result)
        if(obj == null) {
            console.log("Null obj")
        }
        let arr = result.recievedRequests
        arr.push(obj)
        // result.recievedRequests.push(obj)
        result.save(function(err, done) {
            if(err) {
                console.log("error while saving the user", err)
            } 
            console.log("User is saved successfully", done)
        })
    })
}

async function saveTheUserSendedRequest(id, obj) {
    await User.findOne({ myMateId: id }).then((result) => {
        console.log("Current User found", result)
        if(obj == null) {
            console.log("null obj")
        } 
        let arr = result.sendedRequests
        arr.push(obj) 
        result.save(function(err, done) {
            if(err) {
                console.log("Error while saving the sending request", err)
            }
            console.log("User is saved successfully", done)
        })
    })
}

module.exports = {
    findUser,
    saveTheUserRecievedRequest,
    saveTheUserSendedRequest
}