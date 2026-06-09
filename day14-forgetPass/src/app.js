require("dotenv").config();
const express = require("express");
const path = require('path')
const cookieParser = require("cookie-parser")

const authRoutes = require("./routes/auth.routes");
const cacheInstance = require("./config/caching");
const protect = require("./middleware/auth.middleware");

const app = express();

cacheInstance.on("connect", () => {
    console.log("radis connected")
})

cacheInstance.on("error", (err) => {
    console.log("radis error", err)
})


app.use(express.json());
// use for form data except
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// jab views folder src ke ander ho tab
app.set("views", path.join(__dirname, "./views"))
app.set("view engine", "ejs")

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.render("index.ejs", {data: [{name: "avesh"}, {name: "rohan"}]})
});

app.get("/home", protect,  (req, res) => {
    res.send("mai home me hu")
});



module.exports = app;
