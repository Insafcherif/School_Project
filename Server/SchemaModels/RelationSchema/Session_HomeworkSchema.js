const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  session_id: { type: mongoose.Types.ObjectId, ref: "session" },
  HomeWork_id: { type: mongoose.Types.ObjectId, ref: "HomeWork" },
});

module.exports = mongoose.model("Session_homeWork", schema);
