const mongoose = require("mongoose");
const { AbstractBaseSchema } = require("./BaseSchema");

const adminSchema = new AbstractBaseSchema({
  fonction: {
    type: String,
  },
  date_of_birth: { type: String },
  joining_year: {
    type: Number,
  },
  empolyee_id: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("admin", adminSchema);

