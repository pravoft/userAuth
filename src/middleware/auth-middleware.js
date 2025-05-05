const jwt = require("jsonwebtoken")
const User = require("../models/user-model.js")
const dotenv = require("dotenv")
dotenv.config()

const authenticateUser = async (req, res, next) => {
    try {
        let authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(!token){
            return res.status(401).json({message:"Unauthorized: No Token"})
        } 
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if (!decode || !decode.id) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = await User.findById(decode.id).select("-password")
         // If user is not found, return error
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        next()
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = authenticateUser