const express = require('express')
const { cookie } = require('express/lib/response')
const mognoose = require('mongoose')
const User = require('../model/user')
const { findUser, sendMateRequest, saveTheUser, saveTheUserRecievedRequest, saveTheUserSendedRequest } = require('../utils/utils')

exports.findRoomMate = async (req, res) => {
    const roomMateMyMateId = req.body.myMateId
    // console.log("Mymate query------------", roomMateMyMateId)

    const user = await findUser(roomMateMyMateId)
    
    const cookieKey = process.env.COOKIES_KEY
    const currentUserEmail = req.cookies[cookieKey].email
    // console.log('currrentuser------------', currentUserEmail)
    let foundUser = user[0].email
    // console.log("found user--------------", foundUser)
    if(currentUserEmail == foundUser || !user) {
        res.send("No user found")
    }
    res.status(200).send(user)
}

exports.sendRequest = async(req, res) => {
    const myMateId = req.query.myMateId
    const cookieKey = process.env.COOKIES_KEY
    const currentUserEmail = req.cookies[cookieKey].email
    const currentUserMyMateId = req.cookies[cookieKey].myMateId
    // console.log(currentUserMyMateId)

    let recievedRequests = {
        myMateId: currentUserMyMateId,
        acceptStatus: false
    }
    let sendedRequest = {
        myMateId,
        acceptStatus: false
    }
    const foundUser = await findUser(myMateId)
    console.log("------------------------------", foundUser)
    const loggedInUser = await findUser(currentUserMyMateId)
    if(foundUser.length === 0) {
        res.status(409).send({
            message: "RoomMate not found!!"
        })
    } else if(foundUser[0].myMateId === currentUserMyMateId) {
        res.status(409).send({
            message: "You can't search your own Account!"
        })
    }
    let foundUserReRequestsArr = foundUser[0].recievedRequests
    let loggedInUserSeRequestArr = loggedInUser[0].sendedRequests
    console.log("---------------------------------------",foundUserReRequestsArr.indexOf(recievedRequests))
    if(foundUserReRequestsArr.indexOf(recievedRequests) === -1) {
        foundUserReRequestsArr.push(recievedRequests)
        await saveTheUserRecievedRequest(foundUser[0].myMateId, recievedRequests)
        await saveTheUserSendedRequest(currentUserMyMateId, sendedRequest)
    } else if (foundUserReRequestsArr.indexOf(recievedRequests) != -1){
        res.send({
            message: "Request already sent"
        })
    }
    res.send({
        foundUser,
        loggedInUser
    })

    // res.send(h[0].email)
}