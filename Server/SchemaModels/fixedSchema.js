const mongoose = require("mongoose");

// model of level or niveau

const levelSchema = mongoose.Schema({
  levelNumber: { type: Number, enum: [1, 2, 3, 4, 5, 6] },
  levelPrice: { type: Number },
  levelSubject: [],
 });

const LevelModel = mongoose.model("level", levelSchema);

// model of subject

const subjectSchema = mongoose.Schema({
  subjectName: {
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

const SubjectModel = mongoose.model("subject", subjectSchema);

// model of note

const noteSchema = mongoose.Schema({
  NoteType: {
    type: String,
    enum: ["Main Exam", "Control Exam", "Test", "Orale"],
  },
  NoteExm: { type: Number },
  NoteCoef: { type: Number },
  NoteDate: { type: Date },
  Period: { type: Number, enum: [1, 2, 3] },
  student: [],
  level: [],
  Prof: [],
});

const NoteModel = mongoose.model("note", noteSchema);

// model of evaluation

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

// model of club

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  members: [],
  date: { type: Date, default: Date.now },
});

const ClubModel = mongoose.model("Club", clubSchema);

module.exports = {
  LevelModel,
  SubjectModel,
  NoteModel,
  evaluationModel,
  ClubModel,
};
