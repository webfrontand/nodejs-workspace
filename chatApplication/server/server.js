const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { expressConfig, mongooseConfig, passportConfig } = require('../config/');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook');

const port = process.env.PORT || 3000;

const mongoose = require('mongoose');

const routes = require('../routes/');


expressConfig(app, mongoose, passport);
mongooseConfig(mongoose);
passportConfig(passport, LocalStrategy, FacebookStrategy);

app.use('/', routes);


http.listen(port, function(){
  console.log(`Express Server running ${port}`);
});
