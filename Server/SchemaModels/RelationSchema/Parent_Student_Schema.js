const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  parent_id: { type: mongoose.Types.ObjectId, ref: "parent" },
  student_id: { type: mongoose.Types.ObjectId, ref: "student" },
  relation: { type: String, },
  is_parent: {type: Boolean,},
});

module.exports = mongoose.model("Parent_student", schema);
