const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const auth = require('../middleware/auth')
const cookieParser = require('cookie-parser')
const User = require('../model/user')
const addRoomMateController = require('../controllers/roomMate')

router.get('/search', auth ,addRoomMateController.findRoomMate)

router.post('/addRoomMate', auth ,addRoomMateController.sendRequest)


module.exports = router