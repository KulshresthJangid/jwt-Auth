require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log(`Connection DB was a success`)
}).catch((e) => {
    console.log(`Error while connecting to DB`, e)
})