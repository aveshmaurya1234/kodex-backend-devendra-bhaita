let asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res )).catch(error => 
            next(error)
        )
    }

}

module.exports = asyncHandler

