const {validationResult} = require("express-validator")

const validateError = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const errorMessage = errors.array().map((err) => err.msg)
        return res.status(422).json({
            success:false,
            errors: errorMessage
        })
    }
    next()
}

module.exports = validateError