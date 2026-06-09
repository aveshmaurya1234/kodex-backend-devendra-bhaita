import express from "express";
import passport from "passport"
import jwt from "jsonwebtoken"


let router = express.Router()

router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get("/google/callback", passport.authenticate('google', { failureRedirect: '/', session: false }), 
    (req, res) => {
        // Successful authentication, redirect home.
        let token = jwt.sign({id: req.user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
        res.cookie("token", token, {httpOnly: true})
        return res.send("google authentication successful")
    }
);


export default router;