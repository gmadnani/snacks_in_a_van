const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

//vendor information needed
const vendorSchema = new Schema({
    password: {
        type: String,
        required: [true, "can't be blank"], 
    },
    Vname: { type: String, required: true, unique: true},
    status: { type: String, default: "not ready" },
    location: { type: String},
},{
    timestamps: true,
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;