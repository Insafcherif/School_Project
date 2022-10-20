const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
  className: { type: String, required: true },
  Salle: {
    type: String,
    required: true,
  },
  Level: {
    type: mongoobje.id,
    required: true,
  },
  Year: {
    type: Number,
  },
 
});
module.exports = mongoose.model("class", classSchema);
