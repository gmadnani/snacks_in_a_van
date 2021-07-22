const Cart = require('../models/cart_model');

//function to show cart for a particular customer
exports.show_cart = ((req, res) => {
    Cart.findOne({customer: req.customer.id})
        .exec((error, cart) => {
            if (error) return res.status(400).json({ error });
            if (cart) {
                res.status(200).json({ cart });
            }
        })
});

//function for add to cart
exports.add_to_cart = ((req, res) => {
    
    //customer need to be logged in
    Cart.findOne({
    customer: req.customer.id,
    })
    .exec((error, cart) => {
        if (error) return res.status(400).json ({error});
        if(cart){
            
            //if cart exist update quantity if same item
            const item = req.body.cartItems.item;
            const items = cart.cartItems.find(c => c.item == item);

            let condition, action;

            if (items){
                condition = { "customer": req.customer.id, "cartItems.item": item};
                action = {
                    "$set":{
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: items.quantity + req.body.cartItems.quantity

                        }
                    }
                };
                
            }else{
                condition = { "customer": req.customer.id };
                action = {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                };
            }
            //if cart exists
            Cart.findOneAndUpdate(condition, action )
            .exec((error, _cart) => {   
                if(error) return res.status(400).json({ error});
                if (_cart){
                    return res.status(201).json({ cart: _cart});
                }
            })

        }else{
            const cart = new Cart({
                customer: req.customer.id,
                cartItems: [req.body.cartItems],
            });
        
            cart.save((error, cart) => {
                if(error) return res.status(400).json({ error });
                if (cart) {
                    return res.status(201).json({ cart });
                }
            });
        }
    });
});


// exports.removeCartItems = (req, res) => {
//     const { itemId } = req.body.payload;
//     if (itemId) {
//       Cart.update(
//         { customer: req.customer._id },
//         {
//           $pull: {
//             cartItems: {
//               item: itemId,
//             },
//           },
//         }
//       ).exec((error, result) => {
//         if (error) return res.status(400).json({ error });
//         if (result) {
//           res.status(202).json({ result });
//         }
//       });
//     }
//   };