const mongoose=require('mongoose');

const doubtSchema=new mongoose.Schema({
    doubt: {
        type: String,
        required: true,
    },
    code: {
        type: String,
    },
    answer: {
        type: String,
    }
}, {timestamps: true});

const Query=mongoose.model('query',doubtSchema);

module.exports=Query;