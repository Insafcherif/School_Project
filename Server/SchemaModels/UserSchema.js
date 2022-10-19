const mongoose = require("mongoose");
const { AbstractBaseSchema } = require("./BaseSchema");

const userSchema = new AbstractBaseSchema();

module.exports = mongoose.model("user", userSchema);
