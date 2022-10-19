const mongoose = require("mongoose");
const { AbstractBaseSchema } = require("./BaseSchema");

const profSchema = new AbstractBaseSchema({
  bio: { type: String },
  date_of_birth: { type: String },
  contactType: {
    type: String,
    enum: ["permanent", "contractual"],
    required: false,
  },
  ContactDate: {
    type: String,
    required: false,
  },
  subject: {
    type: String,
    required: false,
  },
  empolyee_id: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("prof", profSchema);
