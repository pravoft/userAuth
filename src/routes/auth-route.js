const express = require("express")
const router = express.Router()
const {register, login, UpdateUser, deleteUser, getUsers, getProfile} = require("../controller/auth-controller")
const {registerValidator, loginValidator} = require("../middleware/userValidator-middleware.js")
const validateError = require("../middleware/validateErrors-middleware.js")
const authenticateUser = require("../middleware/auth-middleware.js")
const allowRoles = require("../middleware/role-middleware.js")

router.post("/register", registerValidator,validateError ,register)
router.post("/login", loginValidator, validateError, login)
router.get("/profile",authenticateUser, allowRoles('admin', 'user'), getProfile)
router.get("/register/:id", getUsers)
router.put("/register/:id", UpdateUser)
router.delete("/register/:id",authenticateUser, allowRoles('admin'), deleteUser)


module.exports = router