const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const isDev = app.settings.env === 'development'
const URL = isDev ? 'http://localhost:3001' : 'https://sketch-book-theta.vercel.app/'
app.use(cors({ origin: URL }));
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: URL });

io.on("connection", (socket) => {
   console.log("server is running...", socket.id); 

   socket.on('beginPath', (arg) => {
      socket.broadcast.emit('beginPath', arg)
   })

   socket.on('drawLine', (arg) => {
      socket.broadcast.emit('drawLine', arg)
   })

   socket.on('changeConfig', (arg) => {
      socket.broadcast.emit('changeConfig', arg)
   })
});

httpServer.listen(5001);