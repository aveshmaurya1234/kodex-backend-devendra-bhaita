let express = require('express');
const fileRoutes = require('./routes/files.routes');
let cors = require('cors')

let app = express()
// handel json data
app.use(express.json())
// handel form data 
app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use("/api/files", fileRoutes)

module.exports = app;