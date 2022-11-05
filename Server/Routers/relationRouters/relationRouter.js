const express = require("express");
const app = express();

const ParentStudent = require("./Parent_StudentRouter");
const levelSubject = require("./levelRouter");
const ProfSubject = require("./Prof_SubjectRouter");
const StudentClass = require("./Student_class_Router");

app.use("/custody", ParentStudent);
app.use("/levels", levelSubject);
app.use("/profsubject", ProfSubject);
app.use("/StudentClass", StudentClass);

module.exports = app;
