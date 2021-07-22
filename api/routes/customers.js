const router = require("express").Router();

const { login, register, get_all_customers } = require("../controllers/customer_controller");

//get all users
router.get('/', get_all_customers);

//add a user
router.post('/register', register);

//login user
router.post('/login', login);

module.exports = router;
