const mongoose = require("mongoose");

const schema = mongoose.Schema({
  hoursSess: { type: String, enum: ["8h-10h", "10-12h", "13h-15h", "15h-17h"] },
  DaySess: {type: Date},
  
});
module.exports = mongoose.model("session", schema);