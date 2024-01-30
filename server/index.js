const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.POST || 3000;
const uri = process.env.ATLAS_URI;

const app = express();

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

app.use(express.json());
app.use(cors());

app.listen(port, (req, res) => {
  console.log(`Server running on port: ${port}`);
});
