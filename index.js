const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
// const fs = require('fs');
// const https = require('https');
const index = require("./routes/index");
const EventEmitter = require('events');
const myEmitter = new EventEmitter();


// const privateKey  = fs.readFileSync('certs/server.key', 'utf8');
// const certificate = fs.readFileSync('certs/server.crt', 'utf8');

//const credentials = {key: privateKey, cert: certificate};

// const {getEventList} = require("./googleConnect/calendar")

// creating app

// const index = require("./routes/index");
// app.use(index);


const app = express();
app.use(index);


app.post('/hello_world', async (req, res) => {
  await io.emit('hello');
  await io.sockets.emit('hello');
  res.send('hello world')
})

app.get('/hello_world', (req, res) => {
  res.send('hello world')
})
// creating servers
var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

// http port defaults
const httpPort = process.env.PORT || 8080;
// const httpsPort = process.env.PORT || 8443;

// adding io framework
const io = socketIo(httpServer);
//const ios = socketIo(httpsServer);

io.on('hello', (socket) => {
  console.log('add_to_calendar on backed')
});

io.on("connection", socket => {
  console.log('connection')
  socket.emit('hello', {hello:'hello_world'})
  socket.on("disconnect", () => console.log("Client disconnected"));
});




// launching servers
// httpsServer.listen(httpPort, () => console.log(`Http server listening on port ${httpPort}`));
httpServer.listen(httpPort, () => {

  io.emit('hello')
  console.log(`Http server listening on port ${httpPort}`)
});
