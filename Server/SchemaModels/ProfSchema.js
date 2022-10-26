const mongoose = require("mongoose");
const { AbstractBaseSchema } = require("./BaseSchema");

const schema = new AbstractBaseSchema({
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
  empolyee_id: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("prof", schema);
