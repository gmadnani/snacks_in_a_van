const router = require("express").Router();
let User = require('../models/users_model');

//get all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

//add a user
router.route('/add').post((req, res) => {
    const email = req.body.email;
    const newUser = new User({email});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
