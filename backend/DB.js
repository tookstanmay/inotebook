// jshint esversion: 6

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });

const mongoose = require("mongoose");
const mongooseURI = process.env.MONGODB_URI;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongooseURI);
    console.log("Connected to mongoDB successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToMongoDB;
