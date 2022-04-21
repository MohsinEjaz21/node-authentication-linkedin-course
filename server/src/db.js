import { MongoClient } from 'mongodb';

let client;

export const initializeDbConnection = async () => {
  client = await MongoClient.connect('mongodb://mohsin:1234@localhost:27017/user_db?authMechanism=DEFAULT&authSource=user_auth_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export const getDbConnection = dbName => {
  const db = client.db(dbName);
  return db;
}