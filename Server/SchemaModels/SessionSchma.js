const mongoose = require("mongoose");

const SessionSchema = mongoose.Schema({
    hoursSess: { type: String, enum: ["8h-10h", "10-12h", "13h-15h", "15h-17h"] },
  DaySess: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  ClassSess: { type: String, required: true },
  Subject: { type: String, required: true },
  attendence: [],
});
