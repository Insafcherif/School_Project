const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  professor_id: { type: mongoose.Types.ObjectId, ref: "prof" },
  session: [{ session_id: { type: mongoose.Types.ObjectId, ref: "session" } }],
});

module.exports = mongoose.model("class_session", schema);
