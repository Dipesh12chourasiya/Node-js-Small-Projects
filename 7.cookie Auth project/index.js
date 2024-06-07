const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

//Middlewares
app.use(express.urlencoded({extended:true}));

// set the view engine
app.set('view engine','ejs');
// app.set('views',path.join(__dirname,'views')); not necessary
app.use(cookieParser()); // parse the cookie into req.cookies method

//simulated database of users dummy data
const users = [
    { username:"john", password:"123", role: "admin"},
    { username:"Peri", password:"123", role: "user"},
];

//Home Route
app.get('/',(req,res) => {
    res.render("home");
})

//Login Route (login form) static
app.get('/login',(req,res) => {
    res.render("login");
})

// logic for post req for login route
app.post('/login',(req,res) => {
    // console.log(req.body.username)
    //find the user login details
    const {username , password} = req.body;
    const userFound = users.find((user)=>{
        return (user.username ===username && user.password ===password);
    })
    // creat the cookie
    res.cookie('userData',JSON.stringify(userFound), {
        maxAge: 5 * 24 * 60 * 1000, // 5 days expiration
        httpOnly:true, // prevent xxx attacks
        secure:false, //recommended to set true in productin environment
        sameSite: 'strict' //it helps to mitigate Csrf attacks
    })
    console.log(userFound);
    //render the dashboard
    if(userFound){
        res.redirect('/dashboard');
    } else res.redirect('/login');
    // rediret the user to login page
})

// route for DashBoard
app.get('/dashboard',(req,res) => {
    //! Grab the user from the cookie
    const userData = req.cookies.userData ? JSON.parse(req.cookies.userData) : null;
    const username = userData?.username;
    // console.log(userData);
    if(username){
        res.render("dashboard",{username});
    } else{
        res.redirect('/login');
    }
})

// Logout route
app.get("/logout",(req,res)=>{
    //logic for logout
    res.clearCookie('userData');
    res.redirect('/');
})

// start the server 
app.listen(3000,()=>console.log("Server Started..."));