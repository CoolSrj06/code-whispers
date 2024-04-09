const URL = require("../model/url");

async function handleHomePage(req,res){
    const allurls=await URL.find({});
    return res.render('home',{
        url: allurls,
    });
};

module.exports={
    handleHomePage,
    
}