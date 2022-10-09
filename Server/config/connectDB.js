const mongoose = require("mongoose");
require("dotenv").config();
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database is successfully connected");
  } catch (error) {
    console.log("DataBase connection is failed");
  }
};
module.exports = connectdb