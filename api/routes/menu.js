const router = require("express").Router();
let Menu = require("../models/menu_model");
const {
  addtoMenu,
  getMenu,
  getMenuItem,
} = require("../controllers/menu_controller");
const multer = require("multer");

const shortid = require("shortid");

//get all menu items
router.get("/", getMenu);

//get only 1 menu item
router.get("/:id", getMenuItem);

//adding a new item to  the menu
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// add an item to menu
router.post("/add", upload.single("itemPic"), addtoMenu);

module.exports = router;
