const Order = require("../models/order_model");
const Cart = require("../models/cart_model");

//function to show order for a particular customer
exports.show_order = (req, res) => {
  Order.findOne({ customer: req.customer.id }).exec((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      res.status(200).json({ order });
    }
  });
};

//function for vendors to get their orders
exports.getVendorOrders = (req, res) => {
  //vender can only access after login
  Order.findOne({ vendor: req.vendor.id })
    // .populate("orderItems.item", "id name price")
    .exec((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        res.status(200).json({ order });
      }
    });
};

// Function to get orders that are outstanding
exports.showOutstandingOrders = (req, res) => {
  Order.find({ orderStatus: "Outstanding" }).exec((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      console.log(order);
      res.status(200).json({ order });
    }
  });
};

// Function to get orders that are fulfilled
exports.showFulfilledOrders = (req, res) => {
  Order.find({ orderStatus: "Fulfilled" }).exec((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      console.log(order);
      res.status(200).json({ order });
    }
  });
};

// Function to get orders that are completed/picked up
exports.showCompletedOrders = (req, res) => {
  Order.find({ orderStatus: "Completed" }).exec((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      console.log(order);
      res.status(200).json({ order });
    }
  });
};

//function for changing status to order fulfilled
exports.setFulfilled = (req, res) => {
  var id = req.params.id;
  console.log(id);
  //for particular order it updates
  Order.findByIdAndUpdate(
    { _id: id },
    { $set: { orderStatus: "Fulfilled" } },
    (error, response) => {
      res.json(response);
    }
  );
};

//function for changing status to order completed
exports.setCompleted = (req, res) => {
  var id = req.params.id;
  console.log(id);
  //for particular order it updates
  Order.findByIdAndUpdate(
    { _id: id },
    { $set: { orderStatus: "Completed" } },
    (error, response) => {
      res.json(response);
    }
  );
};

//function for add to order
exports.add_to_order = (req, res) => {
  //customer need to be logged in and vendor id to whom you want to send the order to need to be passed in the url

  Order.findOne({
    customer: req.customer.id,
  }).exec((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      console.log("order exists");
      //if order exist update quantity if same item
      const item = req.body.orderItems.item;
      const items = order.orderItems.find((c) => c.item == item);

      let condition, action;

      if (items) {
        condition = { customer: req.customer.id, "orderItems.item": item };
        action = {
          $set: {
            "orderItems.$": {
              ...req.body.orderItems,
              quantity: items.quantity + req.body.orderItems.quantity,
            },
          },
        };
      } else {
        condition = { customer: req.customer.id };
        action = {
          $push: {
            orderItems: req.body.orderItems,
          },
        };
      }
      //if order exists
      Order.findOneAndUpdate(condition, action).exec((error, _order) => {
        if (error) return res.status(400).json({ error });
        if (_order) {
          return res.status(201).json({ order: _order });
        }
      });
    } else {
      Cart.deleteOne({ customer: req.customer.id }).exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
          console.log("new order");
          console.log(req.body.orderItems);
          const order = new Order({
            customer: req.customer.id,
            orderItems: req.body.orderItems,
          });

          order.save((error, order) => {
            if (error) return res.status(400).json({ error });
            if (order) {
              return res.status(201).json({ order });
            }
          });
        }
      });
    }
  });
};

//function to cancel order
exports.cancel_order = (req, res) => {
  Order.deleteOne({ customer: req.customer.id }).exec((error, result) => {
    if (error) return res.status(400).json({ error });
    if (result) {
      return res.status(201).json({ result });
    }
  });
};
