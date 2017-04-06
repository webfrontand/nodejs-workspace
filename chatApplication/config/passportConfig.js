const User = require('../models/user');

// const { generateHash, compareHash } = require('../helpers/bcrypt');

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
    User.findFacebookId(profile.id).then(function(user) {
      if(user){
        return done(null, user);
      } else {
        const newUser = new User({
          type: 'facebook',
          common_profile: {
            username: profile.displayName
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
        if (err)
          return done(err);

        // if user exists already
        if (user) {
          return done(null, false, req.flash('signupMessage', '이미 존재하는 이메일입니다.'));
        } else {

          // create the user
          var newUser            = new User();
          newUser.common_profile.email = email;
          newUser.common_profile.password = newUser.generateHash(password);
          newUser.common_profile.username = req.body.username;
          
          newUser.save(function(err) {
              if (err)
                  throw err;
              return done(null, newUser);
          });
        }
      });
    });
  }));






  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email'
  }, function(email, password, done) {
    let _user = undefined;

    User.findEmail(email)
    .then(function(user) {
      if(user) {
        console.log(user);
        _user = user;
        console.log(user);
        return compareHash(user.common_profile.password, password);
      } else {
        return done(null, false);
      }
    }).then(function(result) {
      if(result) {
        return done(null, {
          id: _user._id.toString(),
          common_profile: _user.common_profile
        });
      } else {
        return done(null, false);
      }
    }).catch(function(error){
      console.error(error);
      return done(error);
    })
  }))
}
