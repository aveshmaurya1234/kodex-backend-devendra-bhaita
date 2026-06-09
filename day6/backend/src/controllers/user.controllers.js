const UserModel = require("../models/user.model");
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')

const registerController = async (req, res) => {
    try {
        let {name, email, password, mobile} = req.body;

        if(!email, !password, !mobile)
        return res.status(400).json({
            message: "All fields are required",
        })

        let isExisted = await UserModel.findOne({email})
        if(isExisted)
        return res.status(409).json({
            message: "email alredy exist",
        })

        // hashpassword
        let hashPass = await bcrypt.hash(password, 10)

        let newUser = await UserModel.create({
            name, email, password:hashPass, mobile
        })

        // Authorization token
        let token = jwt.sign({id: newUser._id}, process.env.SECRET_KEY, {expiresIn:"1h"})

        res.cookie("token", token)

        return res.status(201).json({
            message: "User created successfully.",
            user : newUser,
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }

}

const loginController = async (req, res) => {
    try {
        let { email, password} = req.body;

        if(!email, !password)
        return res.status(400).json({
            message: "All fields are required",
        })

        let isExisted = await UserModel.findOne({email})
        if(!isExisted)
        return res.status(404).json({
            message: "user not found",
        })

        // verifyPassword
        let compairPass = await bcrypt.compare(password, isExisted.password)
        if(!compairPass)
        return res.status(401).json({
            message: "Invalid credentials",
        })

        // Authorization token genrate
        let token = jwt.sign({id: isExisted._id}, process.env.SECRET_KEY, {expiresIn:"1h"})
        res.cookie("token", token)

        // send loggedin user response
        return res.status(200).json({
            message: "User logged-in successfully.",
            user : isExisted,
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }

}


module.exports = {
    registerController,
    loginController,
}