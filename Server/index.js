const connectdb = require("./config/connectDB");
const express = require("express");
const app = express();
const port = process.env.PORT;
const teacherRouter=require('./Routers/teacherRouter')
const userRouter=require('./Routers/UserRouter')
const parentRouter = require('./Routers/parentRouter')


app.use(express.json());
app.listen(port, (e) => {
  e
    ? console.log("server is failed")
    : console.log(`server  is conected on ${port} `);
});

connectdb();
app.use('/api', teacherRouter )
app.use('/api', userRouter )
app.use('/api', parentRouter )
