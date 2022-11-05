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
  students: [{ type: mongoose.Types.ObjectId, ref: "student" }],
});
module.exports = mongoose.model("clas", schema);
