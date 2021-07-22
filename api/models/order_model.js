const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//order information needed
const orderSchema = new Schema(
  {
    vendor: { type: mongoose.Schema.Types.ObjectId },
    customer: { type: mongoose.Schema.Types.ObjectId, required: true },
    orderItems: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, required: true },
        quantity: { type: Number, default: 1, required: true },
        cost: { type: Number },
      },
    ],

    orderStatus: { type: String, default: "Outstanding" },
  },

  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
