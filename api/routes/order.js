const router = require("express").Router();

const { requireLogin } = require("../controllers/customer_controller");
const { requireVendorLogin } = require("../controllers/vendors_controller");
const {
  show_order,
  add_to_order,
  getVendorOrders,
  showOutstandingOrders,
  showFulfilledOrders,
  showCompletedOrders,
  setFulfilled,
  setCompleted,
  cancel_order,
} = require("../controllers/order_controller");

//get all items in the order for that particular customers
router.get("/customers/order", requireLogin, show_order);

//get all orders for that particular vendor
router.get("/vendors/order", requireVendorLogin, getVendorOrders);

//get outstanding orders for that particular vendor
router.get("/vendors/order/outstanding", showOutstandingOrders);

//get fulfilled orders for that particular vendor
router.get("/vendors/order/fulfilled", showFulfilledOrders);

//get completed orders for that particular vendor
router.get("/vendors/order/completed", showCompletedOrders);

//add item to order for that particular customer
router.post("/customers/order/add", requireLogin, add_to_order);

//order to fulfilled for that vendor
router.post("/vendors/order/fulfilled/:id", setFulfilled);

//order to completed for that vendor
router.post("/vendors/order/completed/:id", setCompleted);

//cancel order by customer
router.post("/customers/order/cancel", requireLogin, cancel_order);

module.exports = router;
