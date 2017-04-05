
$(function(){

  var socket = io();
  var messageForm = $('#message-form');
  var messageInput = $('#message-input');
  var lists = $('#lists');
  var sendLocation = $('#send-location');
  var people = $('.people');

  // function scrollToBottom() {
  //     //selectors
  //     var clientHeight = people.prop('clientHeight'); // 사용자가 보이는 영역
  //     var scrollTop = people.prop('scrollTop'); //
  //     var scrollHeight = people.prop('scrollHeight');
  //
  //     if(clientHeight + scrollTop >= scrollHeight){
  //       console.log('should scroll');
  //     }
  //
  //     // 이부분은 필요할떄 다시 보자.
  //     // heights
  // }

  socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err){
      if(err){
        alert(err);
        window.location.href = '/';
      } else {
        console.log('no error');
      }
    });

  });

  socket.on('disconnect', function() {
    console.log('disconnect from server');
  });

  socket.on('newMessage', function(message) {
    console.log(message);;
    lists.append(`<li>${message.text}</li>`);
    messageInput.val('');
    // scrollToBottom()
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
  socket.on('newLocationMessage', function(data){
    lists.append(`<li><a href=${data.url} target="_blank">구글 맵으로!</a></li>`);
    // scrollToBottom()
  });
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
