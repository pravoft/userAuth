const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log("DB Connected Successfully")
    } catch (error) {
        console.error("DB connection Failed",error)
        process.exit(1)
    }
}

module.exports = connectDB