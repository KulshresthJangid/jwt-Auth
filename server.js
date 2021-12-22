require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const db = require('./db/db')
const authRoutes = require('./routes/auth')
const app = express()

app.use(express.json())
app.use(authRoutes)
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})