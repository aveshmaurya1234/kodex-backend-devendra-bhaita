const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const authService = require("../services/auth.service");
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/generateToken");
const cacheInstance = require("../config/caching");

const register = async (req, res) => {
    try {
        const user = await authService.registerUser( req.body );

        let token = generateToken(user._id)
        res.cookie("token", token)

        res.status(201).json({
            success: true,
            data: user,
            token:token
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const user = await authService.loginUser( req.body );

        let token = generateToken(user._id)
        res.cookie("token", token)

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

const forgetPasswordController = async (req, res) => {
    try {
        let result = await authService.forgetPasswordService(req.body)

        res.status(200).json({
            success: true,
            message: "link send",
            data: result,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
}

const resetPasswordController = async (req, res) => {
    try {
        let {token} = req.params

        if(!token){
            return res.status(404).json({
                message:"token not found"
            })
        }
        let decode = jwt.verify(token, process.env.RAW_SECRET)
        if(!decode){
            return res.status(404).json({
                message:"Invalid token"
            })
        }
        let user = await User.findById(decode.id)
        res.render("update.ejs", {userId : user._id})
        
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
}

const updatePasswordController = async (req, res) => {
    try {
        let {password} = req.body;
        let {userId} = req.params

        if(!password){
            return res.status(404).json({
                message:"Password not found"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let updateUser = await User.findByIdAndUpdate(userId, {
            password:hashedPassword
        },{new:true})

        return res.status(200).json({
            success: true,
            message: "Password updated",
            user:updateUser
        });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
}

const userLogoutController = async (req, res) => {
    try {
        let token = req.cookies.token;

        if(!token){
            return res.status(404).json({
                success: false,
                message: "token not found",
            });
        }

        cacheInstance.set(token, "blacklisted")

        res.clearCookie("token")

        return res.status(200).json({
            success: true,
            message: "user logout successfully",
        });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    register,
    login,
    forgetPasswordController,
    resetPasswordController,
    updatePasswordController,
    userLogoutController
};