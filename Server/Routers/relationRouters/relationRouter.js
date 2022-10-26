const express = require("express");
const app = express();

const ParentStudent = require("./Parent_StudentRouter");

app.use("/custody", ParentStudent);

module.exports = app;