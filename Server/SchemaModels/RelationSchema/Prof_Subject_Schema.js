const mongoose = require("mongoose");

const schema = mongoose.Schema({
  professor_id: { type: mongoose.Types.ObjectId, ref: "prof" },
  subject_id: { type: mongoose.Types.ObjectId, ref: "subject" },
  level_id : {type: mongoose.Types.ObjectId, ref: "level" },
  start_date: { type: Date},
  end_date: {type: Date},
});

module.exports = mongoose.model("Prof_Subject", schema);
