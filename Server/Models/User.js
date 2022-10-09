const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
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
  role: {
    type: String,
    enum: ["Parent", "Teacher", "Administrator"],
    default: "Teacher",
  },
  references: { type: [mongoose.Schema.Types.ObjectId], refPath: "model_type" },
  model_type: {
    type: String,
    enum: ["Parent", "Teacher", "Administrator"],
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
