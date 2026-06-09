let express = require('express')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const cookieParser = require('cookie-parser')

let app = express()

// middleware
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', userRoutes)
app.use('/api/posts', postRoutes)

module.exports = app;