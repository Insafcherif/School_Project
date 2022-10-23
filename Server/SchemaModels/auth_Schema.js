const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  UserName: {
    type: String,
  },
  phone: {
    type: String,
  },
  password_hash: {
    type: String,
  },
  user_role: {
    type: String,
  },
});

module.exports =  mongoose.model("auth", schema);
