const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  student_id: {
    type: String,
  },
  class_id: {
    type: String,
  },
  subject_id: {
    type: String,
  },
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

module.exports = mongoose.model("note", noteSchema);
