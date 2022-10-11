const mongoose = require("mongoose");
const { AbstractUserSchema } = require("./User");

const AdminSchema = AbstractUserSchema({
  Job: {
    type: String,
  },
  fonction: {
    type: String,
  },
  date_of_birth: { type: String },
  joining_year: {
    type: String,
  },
  empolyee_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
