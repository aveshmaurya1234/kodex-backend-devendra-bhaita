let express = require('express')
const userRoutes = require('./routes/user.routes')
const homeRoutes = require('./routes/home.routes')
const cookieParser = require('cookie-parser')

let app = express()

app.use(express.json())
app.use(cookieParser())


app.get("/", (req, res) => {
    return res.send("ok")
})

app.use("/api/auth", userRoutes)
app.use("/api/home", homeRoutes)

module.exports = app;