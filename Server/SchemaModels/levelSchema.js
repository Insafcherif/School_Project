const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    levelNumber: { type: Number, enum: [1, 2, 3, 4, 5, 6] },
    levelPrice: { type: Number },
    levelSubject: [],
   });
  
  module.exports = mongoose.model("level", Schema);