import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from './';
import connectMongo from "connect-mongo";

const MongoStore = connectMongo(session);

export default function(app, passport, mongoose) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    resave: true,
    saveUninitialized: true,
		secret: config.sessionSecret,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      stringify: true
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
}
