const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//rating information needed
const ratingSchema = new Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, required: true },
    accuracy_loc: { type: Number, required: true },
    enjoy_food: { type: Number, required: true },
    fast_time: { type: Number, required: true },
    customer_service: { type: Number, required: true },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
