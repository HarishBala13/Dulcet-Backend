const sendLoggerInfo = require("../api/loggerAPI/sendInfoLog");

const LoggerController = async (req, res) => {
  try {
    const message = req.body;
    const logger = await sendLoggerInfo(message);

    logger.info(message.logMessage);

    res.status(200).json({ message: "Message logged successfully" });
  } catch (error) {
    console.error("Error in LoggerController:", error);
    res.status(500).json({ error: "Failed to log the message" });
  }
};

module.exports = LoggerController;

// const LoggerController = (req, res) => {
//   let message = req.body;
//   console.log(message)
//   sendLoggerInfo(message, (err, info) => {
//     if (err) console.error(err);
//     else console.log("Message logged to database successfully");
//   });
// };

// module.exports = LoggerController;
