const { MongoClient } = require("mongodb");
const { createLogger, format, transports } = require("winston");

const mongoUrl = process.env.MONGODB_URL;
const databaseName = process.env.MONGODB_DATABASE_NAME;

const client = new MongoClient(mongoUrl);

async function sendLoggerInfo(message) {
  await client.connect();

  return createLogger({
    level: "info",
    format: format.combine(
      format.timestamp(),
      format.printf(({ timestamp, level }) => {
        return `${timestamp} [${level}]: ${message}`;
      })
    ),
    transports: [
      new transports.Console(),
      new transports.Stream({
        stream: {
          write: async (message) => {
            const database = client.db(databaseName);
            const collection = database.collection("logEntries");
            await collection.insertOne({ message, timestamp: new Date() });
          },
        },
      }),
    ],
  });
}

module.exports = sendLoggerInfo;
