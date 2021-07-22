let Menu = require('../models/menu_model');

//fuction for get menu
exports.getMenu = ((req, res) => {
    Menu.find()
        .then(menu => res.json(menu))
        .catch(err => res.status(400).json('Error: ' + err));
});

//function for get particular item of the menu
exports.getMenuItem = ((req, res) => {
    console.log(req.params.id)
    Menu.findById(req.params.id)
        .then(menu => res.json(menu))
        .catch(err => res.status(400).json('Error: ' + err));
});


//function for add an item to the menu
exports.addtoMenu = ((req,res) => {
    
    const { name, description, typetags, price, offer } = req.body;

    //picture is a file
    itemPicture = req.file.path;
    
    const newMenu = new Menu({
        name,
        description,
        typetags,
        price,
        offer,
        itemPicture
    });
    newMenu.save()
        .then(() => res.json('Added to the Menu!' + newMenu))
        .catch(err => res.status(400).json('Error: ' + err));
});