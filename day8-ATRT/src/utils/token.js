const jwt = require("jsonwebtoken")


let generateAccessToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET_ACCESS, {expiresIn: "15m"})
}

let generateRefreshToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET_REFRESH, {expiresIn: "1d"})
}

module.exports = {
    generateAccessToken, generateRefreshToken
}