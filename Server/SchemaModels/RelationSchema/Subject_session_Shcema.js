const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  session_id: { type: mongoose.Types.ObjectId, ref: "session" },
  subject_id: { type: mongoose.Types.ObjectId, ref: "subject" },
  class_id: { type: mongoose.Types.ObjectId, ref: "class" },
});

module.exports = mongoose.model("Session_Subject_class", schema);
