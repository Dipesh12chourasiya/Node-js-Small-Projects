const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");

const app = express();

// function myHandler(req,res){
//     const log = `${Date.now()} \n, ${req.url} \n:  New request.`
//     const myUrl = url.parse(req.url);
//     console.log(myUrl);
//     fs.appendFile("log.txt",log, (err,data)=>{
//         res.end("Hello from server again");
//     })

//     console.log("new req recieved");
// }

app.get('/' , (req,res)=>{
    return res.send("Hello from Home");
})

app.get('/about' , (req,res)=>{
    return res.send("Hello from About");
})

// const myServer = http.createServer(app);
// myServer.listen(8000,()=> console.log("Server Started"));

app.listen(8000, ()=> console.log("Server Started.."))