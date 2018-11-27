const express = require('express');
const app = express();
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');
const port = process.env.PORT || 3000;
const publicPath = path.resolve(__dirname + "/public");
const server = http.createServer(app);
let io = socketIO(server);
require('./controllers/usuarios')(app);



app.use(express.static(publicPath));

server.listen(port, ()=>{
    console.log(`listening on port: ${port}`);
});