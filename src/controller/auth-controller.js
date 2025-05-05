const User = require("../models/user-model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const logger = require("../../logger.js")
dotenv.config()


//register
const register = async (req, res) => {
    try {
        const {username, email, password} = req.body
        const userExist = await User.findOne({username, email})
        if(userExist){
            return res.status(400).json({
                message: "User already Exists"
            })
        }
        //hashed password
        const saltRound = 10
        const hashedPassword = await bcrypt.hash(password, saltRound)
        const role = req.body.role || 'user';
        const user = await User.create({username, email, role, password : hashedPassword})
        res.status(201).json({
            success : true,
            id : user._id,
            username : user.username,
            email : user.email,
            role : user.role,
            message : "User has been created successfully",
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}


//Login
const login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user){
            res.status(401).json({
                success:false,
                message:"Invalid username or password"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid username or password"
            })
        }
        //generate token
        const generateToken = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn : "1h"})
        res.status(200).json({
            success : true,
            id : user._id,
            username : user.username,
            role : user.role,
            token : generateToken
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            messsage : error.message
        })
    }

}

const UpdateUser = async (req, res) => {

    console.log("Update error stRTED")
    try {
        const {id} = req.params
        const {username, email, password, role} = req.body
        const updatedUser = await User.findByIdAndUpdate(id, {username, email, password, role},{new:true})
        if(!updatedUser){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        await updatedUser.save()
        res.status(200).json({
            success:true,
            updatedUser
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        }) 
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        const deletedUser = await User.findByIdAndDelete(id)
        if(!deletedUser){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success:true,
            message: "User deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        }) 
    }
}

const getUsers = async (req, res) => {
    try {
        const {id} = req.params
        const getUser = await User.findById(id)
        if(!getUser){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success:true,
            getUser
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })  
    }
}

const getProfile = async (req, res) => {
    try {
        res.json(`Wlecome to your Profile ${req.user.username}, and u are ${req.user.role}`)
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })  
    }
}

module.exports = {register, login, UpdateUser, deleteUser, getUsers, getProfile}

