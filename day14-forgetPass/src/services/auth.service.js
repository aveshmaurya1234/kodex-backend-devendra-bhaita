const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { generateRawToken } = require("../utils/generateToken");
const sendEmails = require("../config/mail");
const emailTemp = require("../utils/emailTemplate");

const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return user
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare( password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    return user
};

const forgetPasswordService = async ({email}) => {
    if(!email) throw new Error("Email not found")
    let isExist = await User.findOne({email})

    if(!isExist)
    return res.status(404).json({
        message: "user not found"
    })

    let rawToken = generateRawToken(isExist._id)

    let resetlink = `http://localhost:3000/api/auth/reset-password/${rawToken}`

    let mailSyntext = emailTemp(isExist.name, resetlink )

    await sendEmails(isExist.email, "For Reset password", mailSyntext )

    return null;
}

module.exports = {
    registerUser,
    loginUser,
    forgetPasswordService
};