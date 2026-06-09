let errorMiddleware = (err, req, res, next) => {
    let message = err.message || "Internal server error"
    res.status(err.statusCode || 500).json({
        message: message,
        success: false
    })
}

module.exports = errorMiddleware;