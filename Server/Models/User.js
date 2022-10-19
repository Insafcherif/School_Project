const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const util = require("util");

//User Schema
function AbstractUserSchema() {
  //call super
  Schema.apply(this, arguments);
  //add
  this.add(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      age: { type: Number, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      gender: { type: String, enum: ["male", "female"] },
      role: { type: String, required: false },
      Image: { type: String, require: true, default:"https://www.kindpng.com/picc/m/78-785917_user-login-function-name-avatar-user-icon-hd.png" },
      Phone: { type: String },
      address:{ type:String},
    },
    { timestamps: true }
  );
}
util.inherits(AbstractUserSchema, Schema);
const userSchema = new AbstractUserSchema();
const exportSchema = mongoose.model("user", userSchema);

module.exports = { exportSchema, AbstractUserSchema };
