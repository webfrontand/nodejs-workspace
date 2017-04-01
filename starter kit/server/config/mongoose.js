import mongoose from 'mongoose';

export default function(config){

  const db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', () => {
    console.log("Connected to mongod server");
  });

  mongoose.connect(config.dbURL);
}
