const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  class_id: { type: mongoose.Types.ObjectId, ref: "clas" },
  students_id: [{ type: mongoose.Types.ObjectId, ref: "student" }],
  reg_date: { type: Date },
  end_date: { type: Date },
});

module.exports = mongoose.model("Student_Class", schema);
