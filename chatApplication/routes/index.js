const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res) {
  res.render('index', {
    user: req.user
  });
});

router.get('/signup', function(req, res) {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup'
}));

router.get('/signin', function(req, res) {
  res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect : '/',
  failureRedirect : '/signin'
}))

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/')
})

module.exports = router;
