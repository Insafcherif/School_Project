const mongoose = require("mongoose");

const schema = mongoose.Schema({
  student_id: { type: mongoose.Types.ObjectId, ref: "student" },
  term: {
    type: Number,
  },
  year: {
    type: Number,
  },
  fee_status: {
    type: String,
  },
});

module.exports = mongoose.model("fee", schema);
