$(document).ready(function(){
  let messages = [];
  let socket = io.connect('http://localhost:3000');
  let chatForm = $('#chatForm');
  let message = $('#chatInput');
  let userForm = $('#userForm');
  let username = $('#username');
  let users = $('#users');
  let error = $('#error');
  let chatWindow = $('#chatWindow');

  userForm.on('submit', function(e){
    e.preventDefault();
    socket.emit('set user', username.val(), function(data){
      if(data){
        $('#userFormWrap').hide();
        $('#mainWrap').show();
      } else {
        error.html('Username is taken')
      }
    })
  });

  chatForm.on('submit', function(e){
    e.preventDefault();
    socket.emit('send message', message.val());
    message.val('');
  });

  socket.on('show message', function(data) {
    chatWindow.append(`<strong>${data.user}</strong>: ${data.msg}<br>`)
  });

  socket.on('users', function(data) {
    let html = '';
    for(let i = 0; i < data.length; i++){
      html += '<li class="list-group-item">'+data[i]+'<li>';
    }
    users.html(html);
  });

  socket.on('exit user', function(data) {
    chatWindow.append(`<strong>System</strong>: ${data}님이 퇴장하셨어요!<br>`)
  })

  socket.on('join user', function(data) {
    chatWindow.append(`<strong>System</strong>: ${data}님이 입장하셨어요!<br>`)
  })
});
