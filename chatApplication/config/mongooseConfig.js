module.exports = function(mongoose){
  const db = mongoose.connection;

  db.on('error', console.error);
  db.once('open', () => {
    console.log('connected to mongod server');
  });

  mongoose.connect('mongodb://localhost/chatApplication');
}
