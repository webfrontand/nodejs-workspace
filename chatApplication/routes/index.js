const express = require('express');
const router = express.Router();
const passport = require('passport');

function checkAuthentication(req, res, next) {
  if(req.isAuthenticated()){
    next();
  } else {
    req.flash('systemMessage', "로그인을 하세요!")
    res.redirect('/');
  }
}
router.get('/', function(req, res) {
  res.render('index', {
    user: req.user,
    message: req.flash('systemMessage')
  });
});

router.get('/signup', function(req, res) {
  res.render('signup', {
    message: req.flash('signupMessage')
  });
});


router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash: true
}));

router.get('/signin', function(req, res) {
  res.render('signin', {
    message: req.flash('loginMessage')
  });
});

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect : '/',
  failureRedirect : '/signin',
  failureFlash: true
}));

router.get('/mypage', checkAuthentication, function(req, res) {
  res.render('mypage', {
    user: req.user
  });
})

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/')
})

module.exports = router;
