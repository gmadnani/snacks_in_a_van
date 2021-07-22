const router = require("express").Router();

const { requireLogin } = require("../controllers/customer_controller");
const {
  show_cart,
  add_to_cart,
  update_cart,
  deleteCart,
  removeCartItems,
} = require("../controllers/cart_controller");

//get all items in the cart for that particular customers
router.get("/customers/cart", requireLogin, show_cart);

//add item to cart for that particular customer
router.post("/customers/cart/add", requireLogin, add_to_cart);

module.exports = router;
