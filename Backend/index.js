const express=require('express');
const app=express();
const path=require('path');
const {logReqRes}=require('./middleware/index');
const useRouter=require('./routes/url');
const {redirectIndex} = require('./middleware/index')

const PORT=8001;
app.listen(PORT,()=> console.log(`Connected at PORT: ${PORT}`));

const {connectMongoDb}=require('./connection');
connectMongoDb("mongodb://127.0.0.1:27017/CodeWispers");

//Middleware
app.use(logReqRes('log.txt'));
//app.use(express.json());
//to support form data 
//app.use(express.urlencoded({extended:false}));


app.use(redirectIndex);
app.use("/",useRouter);