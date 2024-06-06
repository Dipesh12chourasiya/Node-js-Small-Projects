const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectTOMongoDB } = require("./conn");
const {restrictToLoggedinUserOnly , checkAuth} = require('./middelwares/auth');

const URL = require('./models/url');

const urlRouter = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user')   

const app = express();
const PORT = 8001;

// Connection
connectTOMongoDB('mongodb://127.0.0.1:27017/short-url');

//EJS
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false})); 
app.use(cookieParser());

// Route
app.use("/url", restrictToLoggedinUserOnly ,urlRouter);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRouter);

app.get('/url/:shortId', async (req, res) => { // '/:shortId'
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        }, 
        {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        },
    });
    // console.log(entry.redirectURL);
    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log("Server Started at port :" + PORT));
