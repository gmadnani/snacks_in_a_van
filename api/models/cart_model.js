const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

//cart information needed
const cartSchema = new Schema({

    customer: { type: mongoose.Schema.Types.ObjectId, required: true},
    cartItems: [
        {
            item: {type: mongoose.Schema.Types.ObjectId, required: true},
            quantity: { type: Number, default: 1, required: true},
            price: { type: Number }
        }
    ],
},{
    timestamps: true 
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;