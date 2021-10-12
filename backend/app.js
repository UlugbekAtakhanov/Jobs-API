require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()

const authenticateUser = require("./middleware/authentication")

// connectDB
const connectDB = require("./db/connect")
const url = process.env.MONGO_URI

// routers
const authRouter = require("./routes/auth")
const jobsRouter = require("./routes/jobs")

// error handler
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

app.use(express.json())

// extra packages


// routes 
app.use("/api/v1/auth", authRouter)    //==>    /api/v1/auth/register     or     /api/v1/auth/login
app.use("/api/v1/jobs", authenticateUser, jobsRouter)     //==>    /api/v1/auth/jobs/:id
// authenticateUser -- it is a middleware for protection all "jobs" routes altogether
// otherwise you have to write this middleware one by one to all routes that you wanted to protect in "jobs" route

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(url)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start()

