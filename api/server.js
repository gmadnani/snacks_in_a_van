const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

// setup express
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//setup mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, res) {
    try {
      console.log("Connected to Database");
    } catch (err) {
      throw err;
    }
  }
);

app.get("/", (req, res) => res.status(200).json({ message: "Hi!!" }));

console.log("Starting Server");
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//setup routes
const customersRouter = require("./routes/customers");
const menuRouter = require("./routes/menu");
const ratingRouter = require("./routes/rating");
const orderRouter = require("./routes/order");
const cartRouter = require("./routes/cart");

const vendorsRouter = require("./routes/vendors");

app.use("/customers", customersRouter);
app.use("/vendors", vendorsRouter);

app.use("/customers/menu", menuRouter);
app.use("/customers/rate", ratingRouter);

app.use(express.static("uploads"));
//app.use('/uploads', express.static('uploads'));
app.use("/", orderRouter);
app.use("/", cartRouter);
