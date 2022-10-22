const mongoose = require("mongoose");

const evalSchema = mongoose.Schema({
  NoteEval: { type: Number },
  evalDate: { type: Date },
  Week: { type: Number },
  student_id: {
    type: String,
  },
  session_id: {
    type: String,
  },
  comment: { type: String },
});

module.exports = mongoose.model("eval", evalSchema);
