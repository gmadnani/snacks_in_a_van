const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

//user information needed
const userSchema = new Schema({
    email: {
        type: String, 
        lowercase: true, 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true,
        unique: true
    },
},{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
