import { MongoClient } from 'mongodb';

const mongoUrl = process.env.MONGODB_URL || "";
const dbName = process.env.MONGODB_DATABASE_NAME || "";

async function connectToMongoDB() {
  const client = new MongoClient(mongoUrl);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (error) {
    console.error('MongoDB connection error', error);
    throw error;
  }
}
module.exports = connectToMongoDB;