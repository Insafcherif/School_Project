const mongoose = require("mongoose");

const schema = mongoose.Schema({
  className: { type: String, required: true },
  Salle: {
    type: String,
    required: true,
  },
  Level_id: { type: mongoose.Types.ObjectId, ref: "level" },
  Year: {
    type: Number,
  },
 
});
module.exports = mongoose.model("class", schema);
