const mongoose=require('mongoose');

async function connectMongoDb(url){
    return mongoose.connect(url)
    .then(console.log('MongoDb connected Succesfully'))
    .catch((err)=>console.log('Error',err));
}

module.exports={connectMongoDb};