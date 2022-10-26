const mongoose = require("mongoose");

const schema = mongoose.Schema({
  student_id: { type: mongoose.Types.ObjectId, ref: "student" },
  date: {
    type: Date,
  },
  attended: {
    type: Boolean,
  },
  authorized_absence: {
    type: Boolean,
  },
});

module.exports = mongoose.model("attendance", schema);
