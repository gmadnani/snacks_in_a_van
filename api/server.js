const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require('dotenv').config();

// setup express
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/",(req, res)=> res.status(200).send("Hi!"));

console.log("Starting Server");
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

//setup routes
const usersRouter = require('./routes/users');
const menuRouter = require('./routes/menu');

app.use('/users',usersRouter);
app.use('/menu',menuRouter);

//setup mongoose
console.log("Connecting to MongoDB");

mongoose.connect( process.env.MONGODB_URI, 
    { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true },
    err => {
        if (err) return console.error(err);
        console.log("MongoDB connection established");
    });