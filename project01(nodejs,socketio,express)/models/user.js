var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  username: String,
  password: String,
  common_profile: {
    profileID: String,
    fullname: String
  },
  o_auth: {
    facebook: {
      id: String,
      access_token: String
    }
  }
});

module.exports = mongoose.model("users", User);
