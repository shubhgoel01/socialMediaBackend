import { asyncHandeler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"

const errorController = asyncHandeler(async (req, res, next) => {
    console.log("Now Returning an error")
    next(new ApiError(404, "Successfully handling an error","Hi Hi Hi!!"))
})

export {errorController}