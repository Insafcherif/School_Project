const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { AbstractBaseSchema } = require("./BaseSchema");

const schema = new AbstractBaseSchema({
  Job: {
    type: String,
  },
});

module.exports = mongoose.model("parent", schema);
