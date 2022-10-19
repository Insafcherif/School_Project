const mongoose = require("mongoose");

const studSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  date_of_birth: {
    type: String,
  },
  gender: {
    type: String,
  },
  className: {
    type: Number,
    required: true,
  },
  addmision_year: {
    type: Number,
  },
  parent: {
    type: String,
  },
  registration_fees: {
    type: Number,
    required: true,
  },
  Comment: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("student", studSchema);
