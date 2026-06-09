// all change in import export syntax to es6 module syntax
import "dotenv/config"
import express from "express";
import passport from "passport"
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import authRoutes from "./routes/auth.routes.js"
import userModel from "./models/user.model.js"
import cookieParser from "cookie-parser"
import cors from "cors"

let app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, cb) => {
        console.log("profile", profile)
        let name = profile.name.givenName;
        let email = profile.emails[0].value;

        let isExisted = await userModel.findOne({email})

        if (isExisted) {
            return cb(null, isExisted)
        }

        let newUser = await userModel.create({
            name,
            email,
            provider: "google",
            providerId: profile.id
        })

        return cb(null, newUser)
    }
));

app.get("/", (req, res) => {
    res.send("tumse nahi ho payega")
})

app.use("/api/auth", authRoutes)


export default app;

