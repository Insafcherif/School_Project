const mongoose = require("mongoose");

const schema = mongoose.Schema({
  professor_id: { type: mongoose.Types.ObjectId, ref: "prof" },
  parent_ids: [
    {
      parent_id: { type: mongoose.Types.ObjectId, ref: "parent" },
    },
  ],
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("meeting", schema);
