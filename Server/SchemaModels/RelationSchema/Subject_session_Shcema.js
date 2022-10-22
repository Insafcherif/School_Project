const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  session_id: {
    type: String,
    required: true,
  },
  subject_id: {
    type: String,
    required: true,
  },
  class_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Session_Subject", schema);
