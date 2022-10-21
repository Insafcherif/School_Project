const mongoose = require("mongoose");

const evalSchema = mongoose.Schema({
    NoteEval: { type: Number },
    evalDate: { type: Date },
    Week: { type: Number },
    student: [],
    level: [],
    Prof: [],
    comment: { type: String },
  });
  
  const evaluationModel = mongoose.model("eval", evalSchema);