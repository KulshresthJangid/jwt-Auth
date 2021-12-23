const express = require('express')
const mongoose = require('mongoose')
const User = require('../model/user')
const { nanoid } = require('nanoid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

exports.registerAuth = async(req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All input is required")
        }

        const oldUser = await User.findOne({ email })
        if(oldUser) {
            return res.status(409).send("User already Exist. Please Login")
        }

        let encryptedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword,
            myMateId: nanoid(6)
        })

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )
        user.token = token
        res.cookie(process.env.COOKIES_KEY, {
            token: user.token,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        })
        res.status(200).send(user)
    } catch (e) {
        console.log("Error while registeringn the user", e)
        res.status(400).send({
            success: false,
            message: e.message
        })
    }
}

exports.loginAuth = async (req, res) => {
    try {
        const { email, password } = req.body
        // console.log("Request is coming here", email, password)

        if (!(email && password)) {
            res.status(400).send("All input is required")
        }

        const user = await User.findOne({ email })

        if(!user) {
            res.status(409).send({
                message: "No user is registered with this e-mail. Please register"
            })
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            //Create token

            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            )
            user.token = token
            res.cookie(process.env.COOKIES_KEY, {
                token: user.token,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            })
            res.status(200).send(user)
        }
    } catch (e) {
        console.log(e)
        res.status(400).send({
            success: false,
            messager: e.message
        })
    }
}

exports.logoutAuth = async (req, res) => {
    const authHeader = req.headers["x-access-token"]

    jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
        if(logout) {
            res.clearCookie("thisiskey").send({
                msg: 'You have been Logged Out'
            })
        } else {
            res.send({
                msg: 'Error'
            })
        }
    })
}