const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const util = require("util");

//User Schema
function AbstractBaseSchema() {
  //call super
  Schema.apply(this, arguments);
  //add
  this.add({
    nic: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] },
    role: {
      type: String,
      enum: ["Parent", "Professor", "Administrator", "Student"],
      required: false,
    },
    Pict: {
      type: String,
      require: true,
      default:
        "https://www.kindpng.com/picc/m/78-785917_user-login-function-name-avatar-user-icon-hd.png",
    },
    Phone: { type: Number },
    address: { type: String },
    access_level_id: {
      type: String,
    },
  });
}
util.inherits(AbstractBaseSchema, Schema);

const userModelSchema = new AbstractBaseSchema();
const UserModel = mongoose.model("UserModel", userModelSchema);

module.exports = { AbstractBaseSchema, UserModel };
