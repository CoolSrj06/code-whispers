const express=require('express');
const session = require('express-session'); 
const app=express();
const path=require('path');
const {logReqRes, redirectIndex, configureSessionMiddleware, requireLogin}=require('./middleware/index');
const useRouter=require('./routes/url');
const userRouter=require('./routes/user');
const doubtRouter=require('./routes/doubt');

//Middleware

//app.use(logReqRes('log.txt'));

app.use(express.json());
//to support form data 
app.use(express.urlencoded({extended:false}));

const PORT=8001;
app.listen(PORT,()=> console.log(`Connected at PORT: ${PORT}`));

const {connectMongoDb}=require('./connection');
connectMongoDb("mongodb://127.0.0.1:27017/CodeWispers");


//app.use(redirectIndex);
app.use("/",useRouter);

app.use('/user', userRouter);
app.use('/doubt',doubtRouter);