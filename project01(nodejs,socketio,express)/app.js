var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var connectMongo = require('connect-mongo')(session);
var config = require('./config.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var rooms = [{
  room_name: 'cloud computhing',
  room_number: 902312
}]

var PORT = 3000;
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect(config.dburl);

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser()); // 내 기억엔 추가 안해도 되던걸로 기억.. 버전업 되면서
app.use(session({
  secret: config.sessionSecert,
  saveUninitialized: true,
  resave: true,
  store: new connectMongo({
    url: config.dburl,
    // mongooseConnection: mongoose.connections[0],
    stringify: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
// set NODE_ENV="어쩌고저쩌고"

/*
  세션이라는게 서버에 어느 부분에 저장하는 것인데. 서버가 재시작되면 정보가 삭제된다.
  이런 정보를 저장해두기 위해 db에 세션정보를 저장해두기도 한다.

*/
require('./auth/passportAuth.js')(passport, FacebookStrategy, config);
require('./routes/routes.js')(express, app, passport)

// app.listen(PORT, function(){
//   console.log('Server running!');
// })

var server = require('http').Server(app);
var io = require('socket.io')(server);
require('./socket/socket.js')(io)
server.listen(PORT, function(){
  console.log(`${PORT}`);
})
