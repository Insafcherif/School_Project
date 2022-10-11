const mongoose = require("mongoose");
const { AbstractUserSchema } = require("./User");

const parentSchema = new AbstractUserSchema({
  Job: {
    type: String,
  },
  Student: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("¨Parent", parentSchema);
