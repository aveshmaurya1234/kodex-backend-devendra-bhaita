let nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: "gmail",
    auth: {
        user: "aveshmaurya6391@gmail.com",
        pass: "efuzkdivjwmopmrq",
    }
});

let sendEmails = async (to, subject, text) => {
    let option = {
        from: '"My Website" <aveshmaurya6391@gmail.com>',
        to,
        subject,
        text,
        html: "<h1>Thanks for registering!</h1>"
    }
    await transporter.sendMail(option)
}

module.exports = sendEmails