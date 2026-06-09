let express = require("express");
const sendEmails = require("./config/mail.service");
let app = express()

app.get("/sendmail", async (req, res) => {
    await sendEmails("aveshmaurya9453@gmail.com", "Welcome", "how are you")
    return res.send("chala gaya")
})

module.exports = app;