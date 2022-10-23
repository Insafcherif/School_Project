const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  subject: {
    type: String,
  },
  subjectdfName: {
    type: String,
    enum: [
      "English",
      "Frensh",
      "Arabic",
      "Physical Education",
      "Math",
      "Science",
      "I.T (Information Technology)",
      "Islamic Education",
      "Art",
      "Geography",
      "Chemistry",
      "Physics",
      "Social Education",
      "History",
      "Music",
    ],
  },
});

module.exports = mongoose.model("subject", Schema);
