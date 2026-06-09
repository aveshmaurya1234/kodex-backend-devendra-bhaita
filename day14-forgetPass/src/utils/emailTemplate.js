let emailTemp = (user, resetLink) => {
    return `<div>
        <h1>Hello user's ${user},</h1>
        <p>Please click here for reset your password</p>
        <a href="${resetLink}">Click here</a>
    </div>`
}

module.exports = emailTemp;