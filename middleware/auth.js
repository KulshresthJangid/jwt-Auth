const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')

const config = process.env

const verifyToken = (req, res, next) => {
    const cookieKey = process.env.COOKIES_KEY
    const userInfoCookie = req.cookies[cookieKey]
    if (userInfoCookie == undefined) {
        res.status(400).send("Please Login or register")
    } else {
        const userToken = userInfoCookie.token
        if (!userToken) {
            return res.status(403).send("Please Login to visit this page")
        }
        try {
            const decoded = jwt.verify(userToken, config.TOKEN_KEY)
            req.user = decoded
        } catch (e) {
            return res.status(401).send("Unauthorized")
        }
    }
    // console.log("---------------", userInfoCookie)

    
    return next()
}

module.exports = verifyToken