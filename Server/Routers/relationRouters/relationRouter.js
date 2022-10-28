const express = require("express");
const app = express();

const ParentStudent = require("./Parent_StudentRouter");
const levelSubject = require("./levelRouter");
const ProfSubject = require("./Prof_SubjectRouter");

app.use("/custody", ParentStudent);
app.use("/levels", levelSubject);
app.use("/profsubject", ProfSubject);

module.exports = app;
