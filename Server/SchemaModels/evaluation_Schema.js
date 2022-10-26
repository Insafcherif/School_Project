const mongoose = require("mongoose");

const schema = mongoose.Schema({
  NoteEval: { type: Number },
  evalDate: { type: Date },
  Week: { type: Number },
  student_id: { type: mongoose.Types.ObjectId, ref: "student" },
  session_id: { type: mongoose.Types.ObjectId, ref: "session" },
  comment: { type: String },
});

module.exports = mongoose.model("eval", schema);
