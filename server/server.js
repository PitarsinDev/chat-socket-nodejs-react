const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const port = 3001;
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
});

app.listen(port, () => {
    console.log('Server is running');
});