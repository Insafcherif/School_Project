const express = require("express");
const app = express();

const AccessLevelRouter = require("./AccessLevelRouters");
const classRouter = require("./classRouter");
const clubRouter = require("./ClubRouter");
const evalRouter = require("./evalRouter");
const noteRouter = require("./noteRouter");
const sessionRouter = require("./SessionRouter");
const SubjectRouter = require("./SubjectRouter");

app.use("/accessLevel", AccessLevelRouter);
app.use("/class", classRouter);
app.use("/club", clubRouter);
app.use("/evaluation", evalRouter);
app.use("/Note", noteRouter);
app.use("/Session", sessionRouter);
app.use("/Subject", SubjectRouter);

module.exports = app;
