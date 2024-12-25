const { MongoClient } = require('mongodb');

const mongoUrl = process.env.MONGODB_URL || "";
const dbName = process.env.MONGODB_DATABASE_NAME || "";

let isDatabaseConnected = false;
let cachedClient = null;
let cachedDb = null;

async function connectToMongoDB() {

  if(isDatabaseConnected) {
    console.log('Using existing database connection');
    if (!cachedClient || !cachedDb) throw new Error("No cached connection found");
    return { client: cachedClient, db: cachedDb};
  }
  
  const client = new MongoClient(mongoUrl);
  
  try {
    
    await client.connect();

    isDatabaseConnected = true;
    cachedClient = client;
    cachedDb = client.db(dbName);

    console.log('Connected to MongoDB');
    return { client, db: cachedDb };
  } 
  
  catch (error) {
    console.error('MongoDB connection error', error);
    throw error;
  }
}
module.exports = connectToMongoDB;