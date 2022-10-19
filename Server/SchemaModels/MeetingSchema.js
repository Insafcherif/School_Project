const mongoose = require("mongoose");

const meetingSchema =  mongoose.Schema({
  teacher_id: {
    type: String,
    required: true,
  },
  parent_ids: [
    {
      parent_id: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("meeting", meetingSchema);
