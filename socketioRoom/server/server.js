const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('user connection');

  socket.emit('newMessage', {
    from: 'mike',
    text: 'hello world!',
    createdAt: 123123
  });

  socket.on('createMessage', (message) => {
      console.log(message);
  });

  socket.on('disconnect', () => {
    console.log('user was disconnect');
  });
});

server.listen(port, () => {
  console.log(`Express server running port : ${port} !!`);
});
