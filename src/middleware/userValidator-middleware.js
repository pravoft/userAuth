const {body} = require("express-validator")

//register validator
const registerValidator = [
    body("username").notEmpty().isLength({min:3, max:22}).withMessage("username is not as per rule"),
    body("email").isEmail().withMessage("email is not as per rule"),
    body("password").notEmpty().isLength({min:6, max:22}).withMessage("passsword is not as per rule"),
    body("role").optional().isIn(["admin", "user"]).withMessage("Role must be admin or user")
]

//login vaidator
const loginValidator = [
    body("username").notEmpty().isLength({min:3, max:22}).withMessage("username is not as per rule"),
    body("password").notEmpty().isLength({min:6, max:22}).withMessage("passsword is not as per rule")
]

module.exports = { registerValidator, loginValidator }