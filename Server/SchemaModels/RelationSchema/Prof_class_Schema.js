const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  professor_id: { type: mongoose.Types.ObjectId, ref: "prof" },
  classs_id: [{ class_id: { type: mongoose.Types.ObjectId, ref: "class" } }],
  start_date: { type: Date },
  end_date: { type: Date },
});

module.exports = mongoose.model("Prof_Class", schema);
