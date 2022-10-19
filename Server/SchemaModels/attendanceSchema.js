const mongoose = require("mongoose");

const attendancesSchema = mongoose.Schema({
  studentID: {
    type: String,
    required: true,
  },
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

module.exports = mongoose.model("attendance", attendancesSchema);
