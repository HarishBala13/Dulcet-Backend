const sendLoggerInfo = require("../api/loggerAPI/sendInfoLog");

const LoggerController = (req, res) => {
  let message = req.body;
  sendLoggerInfo(message, (err, info) => {
    if (err) console.error(err);
    else console.log("Message logged to database successfully");
  });
};

module.exports = LoggerController;
