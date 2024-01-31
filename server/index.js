// dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// routes
const userRoute = require("./routes/userRoute");

// defining enviroments
const port = process.env.POST || 3000;
const uri = process.env.ATLAS_URI;

const app = express();

// database connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Succesfully");
  })
  .catch((err) => {
    `MongoDB connection failed: ${err.message}`;
  });

// middlewares
app.use(express.json());
app.use(cors());

// connecting routes
app.use('/api/users', userRoute)

app.get("/", (req, res) => {
  res.send("Welcome to chat API");
});

app.listen(port, (req, res) => {
  console.log(`Server running on port: ${port}`);
});
