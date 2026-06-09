let express = require('express')
const userRoutes = require('./routes/user.routes')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error.middleware')

let app = express()

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", userRoutes)

// global error handling middleware
app.use(errorMiddleware)


module.exports = app;