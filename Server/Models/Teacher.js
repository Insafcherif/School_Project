const mongoose = require("mongoose");
const { AbstractUserSchema } = require("./User");

const teacherSchema = new AbstractUserSchema({
  bio: { type: String },
  date_of_birth: { type: String },
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
  empolyee_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("teacher", teacherSchema);
