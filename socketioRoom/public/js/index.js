
$(function(){

  var socket = io();
  var messageForm = $('#message-form');
  var messageInput = $('#message-input');
  var lists = $('#lists');
  var sendLocation = $('#send-location');

  socket.on('connect', function() {
    console.log('connect to server');

  });

  socket.on('disconnect', function() {
    console.log('disconnect from server');
  });

  socket.on('newMessage', function(message) {
    console.log(message);;
    lists.append(`<li>${message.text}</li>`);
    messageInput.val('');
  });

  socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
  }, function(data) {
    console.log(data);
  });

  messageForm.on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
      from: 'User',
      text: messageInput.val()
    }, function() {

    });
  })

  sendLocation.on('click', function(){
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit('createLocationMessage', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      }, function() {
        console.log('unable to fetch location');
      })
    } else {
      alert('geolocation API를 지원하지 않습니다.');
    }


  })
}());
