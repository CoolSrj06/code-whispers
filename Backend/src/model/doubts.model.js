import mongoose from 'mongoose';
const { Schema } = mongoose;

const doubtSchema=new mongoose.Schema({
    doubt: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        default: null, // Default value if no code is provided
    },
    answer: {
        type: String,
    },
    language:{
        type: String,
        required: true, // Ensures the language field is mandatory
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Refers to the User model
        required: true, // Ensures every query is linked to a user
    },
}, {timestamps: true});

export const Query = mongoose.model('Query ', doubtSchema);