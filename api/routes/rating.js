const router = require("express").Router();
const { submit_rating } = require("../controllers/rating_controller");
const { requireLogin } = require("../controllers/customer_controller");

//add rating for that vendor
router.post("/submit_rating", requireLogin, submit_rating);

module.exports = router;
