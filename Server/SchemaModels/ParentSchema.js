const mongoose = require("mongoose");
const { AbstractBaseSchema } = require("./BaseSchema");

const parentSchema = new AbstractBaseSchema(
    {
  Job: {
    type: String,
  },
  Student: {
    type: String,
    required: true,
  },
}
);

module.exports = mongoose.model("parent", parentSchema);
