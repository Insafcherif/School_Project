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
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  role: {
    type: String,
    required: false,
  },
  Pict: {
    type: String,
    require: true,
    default:
      "https://www.kindpng.com/picc/m/78-785917_user-login-function-name-avatar-user-icon-hd.png",
  },
  addmision_year: {
    type: Number,
  },
  Comment: {
    type: String,
    required: false,
  },
  Phone: { type: Number },
  parent: { type: mongoose.Types.ObjectId, ref: "parent" },
  class : { type: mongoose.Types.ObjectId, ref: "clas" },
});

module.exports = mongoose.model("student", studSchema);
