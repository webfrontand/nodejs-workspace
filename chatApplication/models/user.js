const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  type: String, // local, facebook, ...
  common_profile: {
    username: String,
    email: String,
    password: String
  },
  o_auth: {
    facebook: {
      id: String,
      access_token: String
    }
  }
});

User.statics.findUsername = function(username){
  return this.findOne({
    'common_profile.username': username
  }).exec();
}

User.statics.findEmail = function(email){
  return this.findOne({
    'common_profile.email': email
  }).exec();
}

module.exports = mongoose.model('users', User);
