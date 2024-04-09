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

module.exports={
    logReqRes,redirectIndex,
};