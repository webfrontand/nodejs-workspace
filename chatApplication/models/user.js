const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const User = new Schema({
  type: String, // local, facebook, ...
  common_profile: {
    email: String,
    password: String,
    username: String
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
    return bcrypt.compareSync(password, this.local.password);
};

User.statics.findEmail = function(email){
  return this.findOne({
    'common_profile.email': email
  })
}

User.statics.findFacebookId = function(id){
  return this.findOne({
    'o_auth.facebook.id': id
  })
}

module.exports = mongoose.model('users', User);
