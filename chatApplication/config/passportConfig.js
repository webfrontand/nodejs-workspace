const User = require('../models/user');

const { generateHash, compareHash } = require('../helpers/bcrypt');

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
    passReqToCallback : true
  }, function(req, username, password, done) {
      User.findEmail(req.body.email).then(function(user) {
        if(user) {
          return done(null, false);
        } else {
          return User.findUsername(username);
        }
      }).then(function(user) {
        if(user) {
          return done(null, false);
        } else {
          return generateHash(password);
        }
      }).then(function(hash) {
        const newUser = new User({
          type: 'local',
          common_profile: {
            username: username,
            password: hash,
            email: req.body.email
          }
        });

        return newUser.save();
      }).then(function(user) {
        return done(null, user);
      })

  }))

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
