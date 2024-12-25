const { MongoClient, GridFSBucket, ObjectId } = require("mongodb");
const fs = require("fs");
const path = require("path");

const databaseFile =
  "D:/Aspire Projects/Dulcet Angular/BackEnd API/database.json";
const mongoUrl = process.env.MONGODB_URL;
const databaseName = process.env.MONGODB_DATABASE_NAME;
const songsImageURL =
  "D:/Aspire Projects/New Project/Dulcet-FrontEnd/src/assets/songs-assets/songs-images";
const songsAudioURL =
  "D:/Aspire Projects/New Project/Dulcet-FrontEnd/src/assets/songs-assets/songs-audios";

const client = new MongoClient(mongoUrl);
const db = client.db(databaseName);
const topSongsCollection = db.collection("topSongs");
const mixedSongsCollection = db.collection("mixedSongs");
const bucket = new GridFSBucket(db);

async function uploadAllSongstoDatabase() {
  try {
    await client.connect();

    const data = JSON.parse(fs.readFileSync(databaseFile, "utf-8"));

    for (const movie of data.topSongs) {
      const movieName = movie.movieName;
      const songs = Object.values(movie).flatMap((value) =>
        Array.isArray(value) ? value : []
      );

      const updatedSongs = await Promise.all(
        songs.map(async (song) => {
          const imageId = await uploadFileToGridFS(
            path.join(songsImageURL, path.basename(song.images)),
            "image/jpg"
          );
          const audioId = await uploadFileToGridFS(
            path.join(songsAudioURL, path.basename(song.audios)),
            "audio/mpeg"
          );

          return {
            ...song,
            images: imageId,
            audios: audioId,
          };
        })
      );

      await topSongsCollection.insertOne({
        movieName: movieName,
        songs: updatedSongs,
      });
      console.log(`Uploaded songs for movie: ${movieName}`);
    }

    const updatedMixedSongs = await Promise.all(
      data.mixedSongs.map(async (song) => {
        const imageId = await uploadFileToGridFS(
          path.join(songsImageURL, path.basename(song.images)),
          "image/jpg"
        );
        const audioId = await uploadFileToGridFS(
          path.join(songsAudioURL, path.basename(song.audios)),
          "audio/mpeg"
        );

        return {
          ...song,
          images: imageId,
          audios: audioId,
        };
      })
    );

    await mixedSongsCollection.insertMany(updatedMixedSongs);
    console.log("Uploaded MixedSongs.");
  } catch (error) {
    console.error("Error uploading songs:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

async function uploadFileToGridFS(filePath, contentType) {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath); // Use only the base name for storage
    const readStream = fs.createReadStream(filePath);
    const uploadStream = bucket.openUploadStream(fileName, { contentType });

    readStream.pipe(uploadStream);

    uploadStream.on("finish", () => resolve(uploadStream.id.toString())); // Return ObjectId as string
    uploadStream.on("error", (error) => reject(error));
  });
}

async function displayFileWithID(id) {
  try {
    const readStream = bucket.openDownloadStream(new ObjectId(id));
    readStream.pipe(res);
  } catch (error) {}
}

module.exports = uploadAllSongstoDatabase;

/*
async function uploadAllSongstoDatabase() {
  try {
    await client.connect();
    console.log("Database connected!");

    const uploadFileToGridFS = (filePath, bucket) => {
      return new Promise((resolve, reject) => {
        const uploadStream = bucket.openUploadStream(path.basename(filePath));
        fs.createReadStream(filePath)
          .pipe(uploadStream)
          .on("error", (err) => reject(err))
          .on("finish", () => resolve(uploadStream.id));
      });
    };

    for (const movie of data.topSongs) {
      const movieName = movie.movieName;
      const songs = Object.values(movie).flatMap((value) =>
        Array.isArray(value) ? value : []
      );

      const updatedSongs = [];
      for (const song of songs) {
        const imageFilePath = path.join(
          songsImageURL,
          path.basename(song.images)
        );
        const audioFilePath = path.join(
          songsAudioURL,
          path.basename(song.audios)
        );

        const imageId = await uploadFileToGridFS(imageFilePath, bucket);
        const audioId = await uploadFileToGridFS(audioFilePath, bucket);

        updatedSongs.push({
          ...song,
          images: imageId,
          audios: audioId,
        });
      }

      await topSongsCollection.insertOne({ movieName, songs: updatedSongs });
      console.log(`Uploaded topSongs`);
    }

    const updatedMixedSongs = [];
    for (const song of data.mixedSongs) {
      const imageFilePath = path.join(
        songsImageURL,
        path.basename(song.images)
      );
      const audioFilePath = path.join(
        songsAudioURL,
        path.basename(song.audios)
      );

      const imageId = await uploadFileToGridFS(imageFilePath, bucket);
      const audioId = await uploadFileToGridFS(audioFilePath, bucket);

      updatedMixedSongs.push({
        ...song,
        images: imageId,
        audios: audioId,
      });
    }

    await mixedSongsCollection.insertMany(updatedMixedSongs);
    console.log("Uploaded mixedSongs");
  } catch (error) {
    console.error("Error uploading songs:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

*/
