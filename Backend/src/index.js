import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8001, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})



















/**

const express=require('express');
const session = require('express-session'); 
const app=express();
const path=require('path');
const {logReqRes, redirectIndex, configureSessionMiddleware, requireLogin}=require('./middleware/index');
const useRouter=require('./routes/url');
const userRouter=require('./routes/user');
const doubtRouter=require('./routes/doubt');
const cookieParser=require('cookie-parser');//installed => npm install cookie-parser, used when cookie are used

//Middleware

app.use(express.json());
//to support form data 
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.listen(PORT,()=> console.log(`Connected at PORT: ${PORT}`));

const {connectMongoDb}=require('./connection');
connectMongoDb("mongodb://127.0.0.1:27017/CodeWispers");


app.use("/",useRouter);

app.use('/user', userRouter);
app.use('/doubt',doubtRouter);

*/