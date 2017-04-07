const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const User = new Schema({
  type: String, // local, facebook, ...
  common_profile: {
    email: String,
    password: String,
    displayname: String
  },
  o_auth: {
    facebook: {
      id: String,
      access_token: String
    }
  }
});

User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.common_profile.password);
};


User.statics.findByDisplayname = function(displayname){
  return this.findOne({
    'common_profile.displayname': displayname
  }).exec()
}

User.statics.findByFacebookId = function(id){
  return this.findOne({
    'o_auth.facebook.id': id
  })
}

module.exports = mongoose.model('users', User);
