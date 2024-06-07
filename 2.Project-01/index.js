const express = require("express");
const {connectMongo} = require('./connection');

const {logReqRes} = require("./middlewares/index");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// Connection
connectMongo('mongodb://127.0.0.1:27017/db-name-2');

//Middle ware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));


//Routes
app.use("/api/users",userRouter);

app.listen(PORT, () => console.log("Server Started"));