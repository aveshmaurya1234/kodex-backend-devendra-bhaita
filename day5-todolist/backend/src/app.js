require('dotenv').config()
let express = require('express')
const listRoutes = require('./router/list.router')
const cors = require('cors')


let app = express()
app.use(express.json())

app.use(cors({
    origin:'http://localhost:5173'
}))


app.use("/api/lists", listRoutes);
module.exports = app;