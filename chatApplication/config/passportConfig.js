const User = require('../models/user');

module.exports = function(passport, LocalStrategy, FacebookStrategy){
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
      console.log(user);
    })
  });
  passport.use(new FacebookStrategy({
    clientID: '219961725135154',
    clientSecret: 'cf5cdebab257dcc9899cdaafc46ebe18',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName']
  }, function(access_token, refresh_token, profile, done){
    User.findByFacebookId(profile.id).then(function(user) {
      if(user){
        return done(null, user);
      } else {
        const newUser = new User({
          type: 'facebook',
          common_profile: {
            displayname: profile.displayName
          },
          o_auth: {
            facebook: {
              id: profile.id,
              access_token
            }
          }
        })

        return newUser.save();
      }
    }).then(function(user) {
      if(!user) return;
      return done(null, user);
    });
  }));


  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  }, function(req, email, password, done) {
    process.nextTick(function() {


      User.findOne({ 'common_profile.email' :  email }, function(err, user) {
        if(err) {
          return done(err);
        }
        if(req.body.password != req.body.confirmpassword) {
          return done(null, false, req.flash('signupMessage', '비밀번호를 확인하세요!'));
        } else {
          if(user) {
            return done(null, false, req.flash('signupMessage', '이미 존재하는 이메일입니다.'));
          } else {
            // console.log('check findByUsername');
            // console.log(req.body.displayname);
            return User.findByDisplayname(req.body.displayname).then(function(user) {
              console.log(user);
              if(user){
                return done(null, false, req.flash('signupMessage', '이미 존재하는 이름입니다.'));
              } else {
                var newUser = new User();
                newUser.type = 'local'
                newUser.common_profile.email = email;
                newUser.common_profile.password = newUser.generateHash(password);
                newUser.common_profile.displayname = req.body.displayname;

                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
              }
            })
          }
        }

      })
    });
  }));






  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  }, function(req, email, password, done) {
    User.findOne({'common_profile.email' : email}, function (err, user) {
      if(err) {
          return done(err);
      }
      if(!user) {
          return done(null, false, req.flash('loginMessage', '존재하지 않는 이메일입니다.')); // req.flash is the way to set flashdata using connect-flash
        }
      // if the user is found but the password is wrong
      if(!user.validPassword(password)) {
          return done(null, false, req.flash('loginMessage', '비밀번호가 틀렸어요!')); // create the loginMessage and save it to session as flashdata
      }
      // all is well, return successful user
      return done(null, user);
    })
  }))
}
