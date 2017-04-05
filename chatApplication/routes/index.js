const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/signup', function(req, res) {
  res.render('signup', {
    message: req.flash('signupMessage')
  });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

router.get('/signin', function(req, res) {
  res.render('signin');
});

module.exports = router;
