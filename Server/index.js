const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const connectdb = require("./config/connectdb");
const profRouter = require("./Routers/ProfRouters");
const userRouter = require("./Routers/UserRouters");
const partRouter = require("./Routers/ParRouter");
const authRouter = require("./Routers/authRouters");
const logInRouter = require("./Routers/LoginRouter");
const StudentRouter = require("./Routers/StudentRouter");
const SubjectRouter = require("./Routers/SubjectRouter");
const SessionRouter = require("./Routers/SessionRouter");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.listen(port, (e) => {
  e
    ? console.log("server is failed")
    : console.log(`server  is conected on ${port} `);
});

connectdb();

app.use("/api", userRouter);
app.use("/api/prof", profRouter);
app.use("/api/part", partRouter);
app.use("/api", authRouter);
app.use("/api/login", logInRouter);
app.use("/api/student", StudentRouter);
app.use("/api/subject", SubjectRouter);
app.use("/api/session", SessionRouter);
