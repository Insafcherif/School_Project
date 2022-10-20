const mongoose = require("mongoose");
const { AbstractBaseSchema } = require("./BaseSchema");

const parentSchema = new AbstractBaseSchema(
    {
  Job: {
    type: String,
  },
}
);

module.exports = mongoose.model("parent", parentSchema);
