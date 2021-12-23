const express = require('express')
const mognoose = require('mongoose')
const User = require('../model/user')
const { findUser } = require('../utils/utils')

exports.findRoomMate = async (req, res) => {
    const roomMateMyMateId = req.body.myMateId
    // console.log("Mymate query------------", roomMateMyMateId)

    const user = await findUser(roomMateMyMateId)
    

    res.status(200).send(req.cookies.email)
}

exports.sendRequest = async(req, res) => {
    const myMateId = req.query.myMateId
    console.log("My",myMateId)
    const user = await findUser(myMateId)

    res.send({
        user,
        cookies: req.cookies
    })
    // await User.find({ myMateId }).then((result) => {
    //     res.status(200).send({
    //         message: result
    //     })
    // })
}