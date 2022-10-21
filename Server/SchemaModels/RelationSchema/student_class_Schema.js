const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
  },
  class_id: {
    type: String,
    required: true,
  },
  reg_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
});

module.exports = mongoose.model("Student_Class", schema);
