import express from 'express';
import path from 'path';

import passport from 'passport';
import { Strategy as FacebookStrategy }  from 'passport-facebook';

import mongoose from 'mongoose';

import config from './config';
import configExpress from './config/express';
import configMongoose from './config/mongoose';
import configPassport from './config/passport';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

const app = express();
const port = 3000;

// ********************************************
const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo:true
}));
app.use(webpackHotMiddleware(compiler));
// ********************************************

configMongoose(config);
configExpress(app, passport, mongoose);
configPassport(passport, FacebookStrategy, config)

// ********************************************
app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['email']
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
  res.json({
    user: req.user ? req.user : "undefined"
  })
});

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/');
})

app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});


app.listen(port, () => console.log('Running on localhost:3000'));
