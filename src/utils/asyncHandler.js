// const asyncHandler = ()=>{}
/*
    Can be created as two type : 
        1. using promise
        2. using try-catch
*/

export const asyncHandeler = (func) => (req, res, next) =>{
    Promise.resolve(func(req, res, next)).catch(next)
}
/*
    Explanation of above line : asyncHandeler is a higher-order-function that takes a function as a parameter
        (func)=> Now we know if we do not apply the curly bracket, then whatever comes after this is atomatically returned
    So we want to return a function, hence we fully write as
        (func) => ()=>{}
    
    HOW TO LEARN ABOVE SYNTAX

    In continuation to above, 
        Now, i have to implement the input function, passing all the parameters, and wrap it throuh Promise.resolve()
        Now, because i have wrapped using promise, i can use .catch() to catch any error

    here, catch(next) means, telling express taht some error has occurred, and pass this error to your global error handeler.
*/