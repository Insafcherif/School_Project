const mongoose = require("mongoose");
const teacherSchema = mongoose.Schema({
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
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  contactType: {
    type: String,
    enum: ["permanent", "contractual"],
    unique: true,
  },
  ContactDate: {
    type: Date,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("teacher", teacherSchema);
