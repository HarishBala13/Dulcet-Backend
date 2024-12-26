const { MongoClient } = require("mongodb");
const { createLogger, format, transports } = require("winston");
const { Writable } = require("stream");

const mongoUrl = process.env.MONGODB_URL;
const databaseName = process.env.MONGODB_DATABASE_NAME;

const client = new MongoClient(mongoUrl);

async function sendInfoLog(message) {
  try {
    await client.connect();

    console.log("Connected to MongoDB");

    const mongoStream = new Writable({
      write: async (chunk, encoding, callback) => {
        try {
          const database = client.db(databaseName);
          const collection = database.collection("logEntries");
          await collection.insertOne({
            message: chunk.toString(),
            timestamp: new Date(),
          });
          callback(); // Indicate that the write operation is successful
        } catch (error) {
          console.error("Error writing to MongoDB:", error);
          callback(error); // Pass the error to the callback
        }
      },
    });

    console.log("MongoDB stream setup complete");

    console.log("mongostream", mongoStream);

    const logger = createLogger({
      level: "info",
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
      transports: [
        new transports.Console(),
        new transports.Stream({ stream: mongoStream }),
      ],
    });

    return logger;
  } catch (error) {
    console.error("Error in sendInfoLog:", error);
    throw error; // Re-throw error so that it can be handled by the caller
  }
}

module.exports = sendInfoLog;
