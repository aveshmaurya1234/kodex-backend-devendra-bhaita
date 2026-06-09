const express = require("express");

const router = express.Router();

const { 
    register, 
    login, 
    forgetPasswordController, 
    resetPasswordController, 
    updatePasswordController, 
    userLogoutController
} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/forget-password", forgetPasswordController);
router.get("/reset-password/:token", resetPasswordController);
router.post("/update-password/:userId", updatePasswordController)
router.get("/logout", userLogoutController)


module.exports = router;