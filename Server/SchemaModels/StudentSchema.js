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
  date_of_birth: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  addmision_year: {
    type: Number,
  },
  Comment: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("student", studSchema);
