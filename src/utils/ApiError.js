class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}
/*
    This defines a custom class ApiError which extends the built-in Error class. You're using it to create consistent error objects that can be used 
    anywhere in your app when something fails (DB error, user not found, etc.).
*/