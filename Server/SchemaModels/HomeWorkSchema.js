const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  file_id: {
    type: String,
  },
  file_extension: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("HomeWork", schema);
