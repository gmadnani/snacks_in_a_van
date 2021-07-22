const router = require("express").Router();

const {
  login,
  register,
  get_all_vendors,
  changeStatus,
  requireVendorLogin,
  changeStatusClosed,
  getVendor,
} = require("../controllers/vendors_controller");

//get all vendors
router.get("/", get_all_vendors);

//get information of a particular vendor
router.get("/:id", getVendor);

//add a vendor
router.post("/register", register);

//login vendor
router.post("/login", login);

//changing status to ready for that particular vendor
router.post("/changeStatus/:id", changeStatus);

//changing status to closed for that particular vendor
router.post("/changeStatusClosed/:id", changeStatusClosed);

module.exports = router;
