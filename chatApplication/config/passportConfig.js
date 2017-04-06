const User = require('../models/user');

const { generateHash, compareHash } = require('../helpers/bcrypt');

module.exports = function(passport, LocalStrategy, FacebookStrategy){
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  });

  passport.use('local-signup', new LocalStrategy({
    passReqToCallback : true
  }, function(req, username, password, done) {


      User.findEmail(req.body.email).then(function(user) {
        if(user) {
          console.log('true');
          return done(null, false, req.flash('signupMessage', 'exist email'));
        } else {
          return User.findUsername(username);
        }
      }).then(function(user) {
        if(user) {
          return done(null, false, req.flash('signupMessage', 'exist username'));
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
      }).catch(function(error) {
        done(error);
      })

  }))

}
