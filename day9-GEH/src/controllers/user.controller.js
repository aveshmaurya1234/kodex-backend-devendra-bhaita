const { registerService } = require("../services/auth.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

let registerController = asyncHandler( async (req, res) => {
    
    let result = await registerService(req.body)

    return res.status(201).json(
        new ApiResponse("user creted successfully.", result)
    )
})

module.exports = {
    registerController,
}