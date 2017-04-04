const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const generateMessage = require('./utils/message');

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('user connection');

  // socket.emit from admin text welcome to the chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  // socket.broadcast.emit from admin text new user joined
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
      console.log(message);
      io.emit('newMessage', generateMessage(message.from, message.text));
      callback('from server');
      // socket.broadcast.emit('newMessage', {
      //   from: message.from,
      //   text: message.text,
      //   createdAt: new Date().getTime()
      // });
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`))
  });

  socket.on('disconnect', () => {
    console.log('user was disconnect');
  });
});

server.listen(port, () => {
  console.log(`Express server running port : ${port} !!`);
});
