const mongoose = require("mongoose");

const schema = mongoose.Schema({
  student_id: { type: mongoose.Types.ObjectId, ref: "student" },
  subject_id: { type: mongoose.Types.ObjectId, ref: "subject" },
  NoteType: {
    type: String,
    enum: ["Main Exam", "Control Exam", "Test", "Orale"],
  },
  NoteExm: { type: Number },
  NoteCoef: { type: Number },
  NoteDate: { type: Date },
  Period: { type: Number, enum: [1, 2, 3] },
  created_date: {
    type: Date,
  },
});

module.exports = mongoose.model("note", schema);
