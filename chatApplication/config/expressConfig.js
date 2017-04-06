const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectMongo = require('connect-mongo');
const path = require('path');
const flash = require('connect-flash');
const MongoStore = connectMongo(session);

module.exports = function(app, mongoose, passport){
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);


  app.use(express.static(path.join(__dirname, '../public')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'qweqwewqeqweqeqweqweqweqwe',
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  // app.use(function(req, res, next){
  //   res.locals.flash = req.flash
  //   next()
  // })

}
