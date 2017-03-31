var User = require('../models/user');

module.exports = function(express, app, passport){
  var router = express.Router();

  router.get('/', function(req, res, next){
    res.render('index', {
      title: "hello world"
    })
  });

  function securePages(req, res, next){
    if(req.isAuthenticated()){
      next();
    } else {
      res.redirect('/');
    }
  }

  router.get('/auth/facebook', passport.authenticate('facebook'));
  router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/chatrooms',
    failureRedirect: '/'
  }))

  router.get('/chatrooms', securePages , function(req, res, next){
    console.log(req.user);
    res.render('chatrooms', {
      title: "chatrooms",
      user: req.user
    })
  });

  router.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/');
  })

  // router.get('/setcolor', function(req, res, next){
  //   req.session.favColor = "red";
  //   res.send('setting favColor');
  // });
  //
  // router.get('/getcolor', function(req, res, next){
  //   res.send((req.session.favColor === undefined ? "not found" : req.session.favColor));
  // })
  //
  // router.get('/saveUser', function(req, res, next){
  //   var user = new User({
  //     username: "ryu",
  //     password: "tjems431",
  //     fullname: "ryu han gyeong"
  //   })
  //
  //   user.save(function(err, docs) {
  //     res.json(docs)
  //   });
  // })

  app.use('/', router);
}
