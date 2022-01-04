require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const db = require('./db/db')
const authRoutes = require('./routes/auth')
const roomMateRoutes = require('./routes/roomMate')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use(cookieParser())
// app.use(express.json())

app.use(authRoutes)
app.use(roomMateRoutes)
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})