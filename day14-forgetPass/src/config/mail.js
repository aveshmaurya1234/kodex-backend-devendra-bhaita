let nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: "gmail",
    auth: {
        user: process.env.YOUR_EMAIL,
        pass: process.env.APP_PASSWORD,
    }
});

const sendEmails = async (to, subject, html) => {
    const options = {
        from: `"My Website" <${process.env.YOUR_EMAIL}>`,
        to,
        subject,
        html,
    };

    await transporter.sendMail(options);
};

module.exports = sendEmails
