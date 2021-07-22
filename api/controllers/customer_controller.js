const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validRegisterInput = require("../validation/valid_register");
const validLoginInput = require("../validation/valid_login");

let Customer = require('../models/customers_model');

//function for getting all customers
exports.get_all_customers = ((req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json('Error: ' + err));
});

//function for registering customers
exports.register = ((req, res) => {

    const { errors, isValid } = validRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors)
    }

    Customer.findOne({ email: req.body.email }).then(customer => {
        if (customer) {
            return res.status(400).json({ email: "Email already exists" });
        }
    });

    const newCustomer = new Customer({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCustomer.password, salt, (err, hash) => {
            if (err) throw err;
            newCustomer.password = hash;
            newCustomer
                .save()
                .then(customer => res.json(customer))
                .catch(err => console.log(err));
        });
    });
});

//function for login customer
exports.login = ((req, res) => {

    const { errors, isValid } = validLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    Customer.findOne({ email }).then(customer => {
        // Check if user exists
        if (!customer) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        // Check password
        bcrypt.compare(password, customer.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: customer.id,
                    name: customer.name
                };

                // Sign token
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET, {
                        expiresIn: '3h'
                    },
                    (err, token) => {
                        res.json({
                            payload,
                            success: true,
                            token: token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});


//function for required login whne customer needs to do action
exports.requireLogin = (req, res, next) => {
    const token = req.headers.authorization;
    const customer = jwt.verify(token, process.env.JWT_SECRET);
    req.customer = customer;
    next();

}