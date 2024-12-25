const songsImageUpload = (req, res) => {
  const imageFiles = req.files;
  // console.log(imageFiles);
  // console.log(imageFiles.mimetype.slice(0, 5));
  if (!imageFiles) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(imageFiles);
};

const songsAudioUpload = (req, res) => {
  const audioFiles = req.files;
  // console.log(audioFiles);
  // console.log(audioFiles.mimetype.slice(0, 5));
  if (!audioFiles) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(audioFiles);
}

const userProfileUpload =   (req, res) => {
  const userProfile = req.file;
  // console.log(userProfile);
  if (!userProfile) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
}

module.exports = {
  songsImageUpload,
  songsAudioUpload,
  userProfileUpload
};