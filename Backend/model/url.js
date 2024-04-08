const mongoose=require('mongoose');

const urlSchema=new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true,
    },
    redirect: {
        type: String,
        redirect: true,
    },
    /*
     the provided line defines the visitHistory field in a MongoDB document. 
     It specifies that visitHistory is an array where each element is an 
     object with a timestamp property of type Number. This schema definition 
     helps enforce the structure of documents stored in the MongoDB collection 
     and ensures consistency in the data model.
     */
    visitHistory: [{
        timestamp: {type: Number}
    }]
}, {timestamp: true});

module.exports={
    urlSchema,
};

const URL=mongoose.model("url",urlSchema);

module.exports=URL;