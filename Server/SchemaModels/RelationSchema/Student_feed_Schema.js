const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
  },
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

module.exports = mongoose.model("Student_fee", schema);
