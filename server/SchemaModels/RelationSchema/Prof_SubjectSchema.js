const mongoose = require("mongoose");

const schema = mongoose.Schema({
  Prof_id: {
    type: String,
  },
  Subject_id: {
    type: String,
  },
  Class_id: {
    type: String,
  },
  ListOfSession: [],
});

module.exports = mongoose.model("Prof_Subject", schema);
