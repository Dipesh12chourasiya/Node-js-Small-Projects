const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on('connection', (socket) => {
    socket.on('user-message', (message) => { //agr frontend se koi message aata hai
        io.emit("message", message);     // to use bakiyo ko dedo
    })
})

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("./public/index.html");
})

server.listen(9000, () => console.log(`server started at 9000`));