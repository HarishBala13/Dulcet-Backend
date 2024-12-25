const multer = require("multer");
const environment = require("../../environments/environment.prod");

const audioStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, environment.songsAudioURL);
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`);
  },
});

var audioFileUpload = multer({ storage: audioStorage });

module.exports = audioFileUpload;
