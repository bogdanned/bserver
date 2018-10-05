const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
// const fs = require('fs');
// const https = require('https');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

const app = express();

app.post('/alexa/add_transport', async (req, res) => {
  await io.emit('alexa_add_transport');
  res.send('alexa_add_transport')
})

app.get('/hello_world', (req, res) => {
  res.send('hello world')
})

var httpServer = http.createServer(app);

const httpPort = process.env.PORT || 8080;

const io = socketIo(httpServer);
//const ios = socketIo(httpsServer);


io.on("connection", socket => {
  socket.on("disconnect", () => console.log("Client disconnected"));
});

io.on('hello', () => (console.log('hello')))

// launching servers
// httpsServer.listen(httpPort, () => console.log(`Http server listening on port ${httpPort}`));
httpServer.listen(httpPort, () => {
  console.log(`Http server listening on port ${httpPort}`)
});
