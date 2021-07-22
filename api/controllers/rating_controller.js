const Rating = require("../models/rating_model");

//function for submitting a rating
exports.submit_rating = (req, res) => {
  const { accuracy_loc, enjoy_food, fast_time, customer_service, comment } =
    req.body;
  const newRating = new Rating({
    customer: req.customer.id,
    accuracy_loc,
    enjoy_food,
    fast_time,
    customer_service,
    comment,
  });
  newRating
    .save()
    .then(() => res.json("Added Rating!" + newRating))
    .catch((err) => res.status(400).json("Error: " + err));
};
