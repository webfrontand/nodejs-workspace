const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const Users = require('./utils/users');

const port = process.env.PORT || 3000;
let users = new Users();

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('user connection');


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
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // socket.leave();

    // io.emit -> io.to(params.room).emit()
    // socket.broadcast.emit => socket.broadcast.to(params.room)
    // socket.emit

    // socket.emit from admin text welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // socket.broadcast.emit from admin text new user joined
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback()
  });

  socket.on('disconnect', () => {
    console.log('user was disconnect');
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left!`));
    }
  });
});

server.listen(port, () => {
  console.log(`Express server running port : ${port} !!`);
});
