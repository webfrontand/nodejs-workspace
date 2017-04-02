import mongoose, { Schema } from 'mongoose';

const User = new Schema({
  type: String,
  common_profile: {
    username: String,
    email: String
  },
  o_auth: {
    facebook: {
      id: String,
      access_token: String
    }
  }
});

User.statics.findFacebookId = function(id){
  return this.findOne({
    'o_auth.facebook.id': id
  });
}

User.statics.findUsername = function(username){
  return this.findOne({
    'common_profile.username': username
  })
}

export default mongoose.model("users", User);
