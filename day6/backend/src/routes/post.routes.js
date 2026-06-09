let express = require('express')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

let router = express.Router()

router.get("/", 
    // middleware to verify token and authenticate user
    
    async (req, res, next) => {
        // get token
        let token = req.cookies.token
        if(!token) 
            return res.status(404).json({
                message:"token not found"
            })

        // decode token verify
        let decode = jwt.verify(token, process.env.SECRET_KEY)
        if(!decode) 
            return res.status(401).json({
                message:"unauthorized user"
            })

        // find user in database
        let user = await UserModel.findById(decode.id)
        if(!user) 
            return res.status(401).json({
                message:"unauthorized user"
            })
        //
        next()
    }, 
    
    (req,res) => {
        return res.send("post feched successfully.")
    }
)

module.exports = router;