const mongoose = require("mongoose");

const schema = mongoose.Schema({
  session_id: { type: mongoose.Types.ObjectId, ref: "session" },
  attendences_id: [
    {
      attendence_id: { type: mongoose.Types.ObjectId, ref: "attendence" },
    },
  ],
});

module.exports = mongoose.model("Session_Attendance", schema);
