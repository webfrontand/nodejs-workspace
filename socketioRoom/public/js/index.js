var socket = io();

socket.on('connect', function() {
  console.log('connect to server');

  socket.emit('createMessage', {
    from: 'jen',
    text: 'hey. this is andrew.'
  });

});

socket.on('disconnect', function() {
  console.log('disconnect from server');
});

socket.on('newMessage', function(message) {
  console.log(message);
});
