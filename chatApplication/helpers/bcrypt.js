const bcrypt = require('bcryptjs');

const generateHash = function(password){
  return new Promise(function(resolve, reject) {
    bcrypt.hash(password, 8, function(err, hash) {
      if(err){
        return reject(err);
      }
      resolve(hash);
    })
  })
}

const compareHash = function(hash, password) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(password, hash, function(err, result) {
      if(err){
        return reject(err);
      }
      resolve(result);
    })
  })
}

module.exports = {
  generateHash,
  compareHash
}
