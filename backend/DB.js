// jshint esversion: 6

const mongoose = require("mongoose");
const mongooseURI = "mongodb://127.0.0.1:27017/userDB";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongooseURI);
    console.log("Connected to mongoDB successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToMongoDB;
