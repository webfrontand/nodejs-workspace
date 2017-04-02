const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const bodyParser = require('body-parser');
const path = require('path');

const api = require('./routes');

let users = [];
const port = 3000;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

server.listen(port, function(){
  console.log('Express server has started on port 3000');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/', api)

// socket.io connect

io.sockets.on('connection', (socket) => {
  socket.on('set user', (data, callback) => {
    if(users.indexOf(data) != -1){
      callback(false);
    } else {
      callback(true);
      socket.username = data;
      users.push(socket.username);
      updateUsers();
      io.sockets.emit('join user', socket.username);
    }
  });

  socket.on('send message', function(data){
    io.sockets.emit('show message', {
      msg: data,
      user: socket.username
    })
  });

  socket.on('disconnect', function(data){
      if(!socket.username) return;
      users.splice(users.indexOf(socket.username), 1);
      updateUsers();
      io.sockets.emit('exit user', socket.username);
  });

  function updateUsers(){
    io.sockets.emit('users', users);
  }
});
