const multer = require("multer");
const environment =
  require("../../environments/environment.prod");

const imageStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, environment.songsImageURL);
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});

var imageFileUpload = multer({ storage: imageStorage });

module.exports = imageFileUpload;
