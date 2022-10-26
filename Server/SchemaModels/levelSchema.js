const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    levelNumber: { type: Number, enum: [1, 2, 3, 4, 5, 6] },
    levelPrice: { type: Number },
    Subjects: [
        {subject_id: { type: mongoose.Types.ObjectId, ref: "subject" },}
    ],
   });
  
  module.exports = mongoose.model("level", Schema);