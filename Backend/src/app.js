import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// app.use() is a function in Express.js that allows you to add middleware to your application
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
// When extended is set to true, the middleware can parse complex objects
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// The code app.use(express.static("public")) in an Express.js application serves static files from a folder named "public."
app.use(express.static("public")) 
app.use(cookieParser())


//routes import
import urlRouter from './routes/url.routes.js'
import userRouter from './routes/user.routes.js'
// error handler import
import { errorHandler } from './middleware/errorHandler.js';

//routes declaration
app.use("/api/v2/url", urlRouter)
app.use("/api/v2/users", userRouter)

// error-handling middleware (must be added after all routes)
app.use(errorHandler);

export { app }