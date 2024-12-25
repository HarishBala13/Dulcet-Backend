const multer = require("multer");
const environment = require("../../environments/environment.prod");

const userProfileStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(
      null,
      environment.userProfileURL
    );
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});

var userProfileFileUpload = multer({ storage: userProfileStorage });

module.exports = userProfileFileUpload;
