const mongoose = require("mongoose");

const SessionSchema = mongoose.Schema({
  hoursSess: { type: String, enum: ["8h-10h", "10-12h", "13h-15h", "15h-17h"] },
  DaySess: {
    type: Date,
  },
  HomeWork_id: { type: String },
  attendences_id: [
    {
      attendence_id: {
        type: String,
      },
    },
  ],
});
