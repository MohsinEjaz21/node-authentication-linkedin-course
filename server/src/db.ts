import mongoose from 'mongoose';

export const initializeDbConnection = async () => {
  await mongoose.connect('mongodb://mohsin:1234@localhost:27017/user_auth_db?authMechanism=DEFAULT&authSource=user_auth_db')
    .then(() => {
      let { db } = mongoose.connection;
      console.log(`MongoDB Connected with 🌈 ${db.databaseName} `)
    }).catch((err: any) => {
      console.log('MongoDB Connection Error. Please make sure that MongoDB is running. ' + err);
    });
}


export const getDbConnection = () => {
  let { db } = mongoose.connection;
  return db;
}