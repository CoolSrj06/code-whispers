const {getUser} = require('../service/auth');

async function restricToLoggedInUserOnly(req,res,next){
    const userUid=req.cookies.uid;

    if(!userUid) return res.redirect('/');
    const user=getUser(userUid);


    if(!user) return res.redirect('/');

    req.user=user;
    next();
} 

async function checkAuth(req, res, next){
    //check auth is just a basic authentication that checks for the user there is no user it will return null
    const userUid=req.cookies.uid;

    const user=getUser(userUid);

    req.user=user;
    next();
}

module.exports={
    restricToLoggedInUserOnly,
    checkAuth,
}