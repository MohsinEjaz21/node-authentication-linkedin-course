import mongoose from 'mongoose';
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../docker/.env') })

export const initializeDbConnection = async () => {
  const { MONGODB_APPLICATION_DATABASE: dbName } = process.env
  console.log("dbName 🌈", dbName)


  await mongoose.connect(`mongodb://mohsin:1234@localhost:27017/${dbName}?authMechanism=DEFAULT&authSource=${dbName}`)
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