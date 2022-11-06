const mongoose = require("mongoose");
const { AbstractBaseSchema } = require("./BaseSchema");

const schema = new AbstractBaseSchema({
  fonction: {
    type: String,
  },
  joining_year: {
    type: Number,
  },
  empolyee_id: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("admin", schema);

