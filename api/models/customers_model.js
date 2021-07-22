const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

//customer information needed
const customerSchema = new Schema({
    email: {
        type: String, 
        lowercase: true, 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "can't be blank"], 
    },
    name: {
        type: String,
        required:[true]
    }
},{
    timestamps: true,
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
