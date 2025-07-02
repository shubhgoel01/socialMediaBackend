import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
    userName : {
        type : String, 
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    fullName : {
        type : String, 
        required : true,
        trim : true,
        index: true
    },
    email : {
        type : String, 
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    avatar : {
        type: String, 
        required : true
    },
    conerImage : String,
    password : {
        type : String,
        required : [true, "Password is required"],
        minLength : [8, "Password should be of minimum length 8"]
    },
    watchHistory : [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    refreshtoken: {
        type: String
    }

}, {timestamps : true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))
        return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        emial: this.email,
        userName: this.userName,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
        emial: this.email,
        userName: this.userName,
        fullName: this.fullName
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const User = mongoose.model("User", userSchema)