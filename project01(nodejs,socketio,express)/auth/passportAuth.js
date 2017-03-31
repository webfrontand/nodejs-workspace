var User = require('../models/user');

module.exports = function(passport, FacebookStrategy, config){
  /*
    how does it work?
    chatcat 에서 auth request(요청)을 하면 페이스북은
    accessToken, refreshToken, profile을 chatcat에게 준다.

    var User = new Schema({
      username: String,
      password: String,
      common_profile: {
        profileID: String,
        fullname: String,
        profilePic: String
      },
      o_auth: {
        facebook: {
          id: String,
          access_token: String
        }
      }
    });

  */
  passport.serializeUser(function(user, done){
    done(null, user.id); // 최초에
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    })
  })


  passport.use(new FacebookStrategy({
    clientID: config.fb.appID,
    clientSecret: config.fb.appSecret,
    callbackURL: config.fb.callbackURL,
    profileField: ['id', 'displayName', 'photos']
  }, function(accessToken, refreshToken, profile, done) {
    // check if the user exists in our mongodb db
    // if not, create one and return the profile
    // if use exists, simply return the profile

    User.findOne({'common_profile.profileID': profile.id}, function(err, result){
      if(result){
        done(null, result);
        // console.log("result!"+result);
      } else {
        var user = new User({
          "common_profile.profileID": profile.id,
          "common_profile.fullname": profile.displayName,
          "o_auth.facebook.id": profile.id,
          "o_auth.facebook.access_token": accessToken
        });

        user.save(function(err){
          done(null, user);
        });

      }
    })
  }));
}
