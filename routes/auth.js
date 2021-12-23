const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/user')
const auth = require('../middleware/auth')
// const uuid = require('uuid')
const { nanoid } = require('nanoid')
const authControllers = require('../controllers/authControllers')

router.get('/u',async (req, res) => {
    res.send(nanoid(6))
})

router.get('/', (req, res) => {
    res.status(200).send({
        message: "Welcome to my mate auth API"
    })
})

router.post('/register', authControllers.registerAuth)

router.post('/login', authControllers.loginAuth)

router.post('/logout', auth, authControllers.logoutAuth)

router.get('/welcome', auth, async (req, res) => {
    res.status(200).send("Welcome")
})

module.exports = router