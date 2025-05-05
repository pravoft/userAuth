const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./src/config/db.js")
const authRoute = require("./src/routes/auth-route.js")
const postRoute = require("./src/routes/post-route.js")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")

dotenv.config()
const app = express()
const port = process.env.PORT || 8080
connectDB()
// app.use(morgan("tiny"))
morgan.token('host', (req, res) => {
    return req.hostname
})
app.use(morgan(`:method :url :host`))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api", postRoute)


app.listen(port, () => {
    console.log(`Server running at port no. : ${port}`)
})