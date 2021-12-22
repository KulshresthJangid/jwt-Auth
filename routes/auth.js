const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/user')
const auth = require('../middleware/auth')

router.post('/register', async (req, res) => {
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
            password: encryptedPassword
        })

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )
        user.token = token
        res.status(200).send(user)
    } catch (e) {
        console.log("Error while registeringn the user", e)
        res.status(400).send({
            success: false,
            message: e.message
        })
    }
})

router.post('/login',async (req, res) => {
    try {
        const { email, password } = req.body

        if (!(email && password)) {
            res.status(400).send("All input is required")
        }

        const user = await User.findOne({ email })

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

            res.status(200).send(user)
        }
    } catch (e) {
        console.log(err)
        res.status(400).send({
            success: false,
            messager: e.message
        })
    }
})

router.get('/', auth, async (req, res) => {
    res.status(200).send("Welcome")
})

module.exports = router