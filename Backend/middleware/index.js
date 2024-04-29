const express = require('express');
const session = require('express-session'); 

const app = express();

const fs=require('fs');

function logReqRes(filename){
    return (req,res,next)=>{
        fs.appendFile(filename,
            `${Date.now()}:${req.ip} ${req.method}:${req.path}\n`,
        (err,data)=>{
            next();
        })    
    };
};

function redirectIndex(req, res, next) {
    if (req.path === '/index' || req.path === '/index.html') {
      return res.redirect(301, '/'); // 301 for permanent redirect
    }
    next(); // Continue to other routes if not a match
  }

  
  function configureSessionMiddleware() {
    app.use(session({
      secret: 'a-temporary-secret', // Important: Change this later
      resave: false,
      saveUninitialized: false,
    }));
  }

  function requireLogin(req, res, next) {
    if (req.session.username) {
        next(); // User is logged in
    } else {
        res.redirect('/login'); 
    }
}
  
module.exports={
    logReqRes,redirectIndex,configureSessionMiddleware,requireLogin,
};