// const { connectToMongoDB } = require("../../mongodb");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const stream = require("stream");
const environment = require("../../environments/environment.prod");

const songSchema = new mongoose.Schema(
  {
    movieName: String,
    songs: [
      {
        images: {
          data: Buffer,
          contentType: String,
          originalPath: String,
        },
        audios: {
          data: Buffer,
          contentType: String,
          originalPath: String,
        },
        movie_name: String,
        song_name: String,
        singers_name: String,
        duration: String,
        isLiked: Boolean,
        id: Number,
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    optimisticConcurrency: true, // Enable optimistic locking
  }
);
songSchema.index({ movieName: 1, "songs.id": 1 });

const TopSongsModel = mongoose.model("TopSongs", songSchema);

async function migrateSongsToMongoDB() {
  const database = JSON.parse(fs.readFileSync("database.json", "utf-8"));

  const bulkOps = [];

  // Process each movie group
  for (const movieGroup of database.topSongs) {
    const movieName = movieGroup.movieName;
    const songs = [];

    // Process each song in the movie group
    for (const song of movieGroup[Object.keys(movieGroup)[1]]) {
      try {
        // Image processing with stream
        const imageBuffer = await processFile(song.images);
        const audioBuffer = await processFile(song.audios);

        console.log(song.images);
        console.log(environment.songsImageURL + song.images);

        // songs.push({
        //   ...song,
        //   images: {
        //     data: imageBuffer,
        //     contentType: getFileContentType(song.images),
        //     originalPath: song.images
        //   },
        //   audios: {
        //     data: audioBuffer,
        //     contentType: getFileContentType(song.audios),
        //     originalPath: song.audios
        //   }
        // });
      } catch (error) {
        console.error(`Error processing song ${song.song_name}:`, error);
      }
    }

    // Bulk write operation
    // bulkOps.push({
    //   updateOne: {
    //     filter: { movieName },
    //     update: {
    //       $set: {
    //         movieName,
    //         songs,
    //       },
    //     },
    //     upsert: true,
    //   },
    // });
  }

  // Perform bulk write with error handling
  // try {
  //   await TopSongsModel.bulkWrite(bulkOps, { ordered: false });
  //   console.log("Songs uploaded successfully");
  // } catch (error) {
  //   console.error("Bulk upload error:", error);
  // }
}

// Stream-based file processing
async function processFile(filePath) {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(__dirname, filePath);
    console.log("FUllPath: " + fullPath);
    console.log(
      "Songs Image actual FUllPath: " + environment.songsImageURL + '/' + fullPath.split("\\").pop()
    );

    // Use streams for large files
    // const readStream = fs.createReadStream(fullPath);
    // const chunks = [];

    // readStream.on("data", (chunk) => chunks.push(chunk));
    // readStream.on("end", () => resolve(Buffer.concat(chunks)));
    // readStream.on("error", reject);
  });
}

// Content type detection
function getFileContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".mp3": "audio/mpeg",
    default: "application/octet-stream",
  };
  return contentTypes[ext] || contentTypes.default;
}

module.exports = migrateSongsToMongoDB;

//   export async function uploadSongsToFirebaseDB() {

//     admin.initializeApp({
//         credential: admin.credential.cert('dulcetAccountFirebaseService.json'),
//         storageBucket: 'dulcet-v1.firebasestorage.app'
//     });

//     const bucket = admin.storage().bucket();
//     const songsCollection = admin.firestore().collection('songs');

//   }

// export async function migrateSongsToMongoDB() {
//     try {
//       // Read local JSON file
//       const songsData = JSON.parse(fs.readFileSync('songs.json', 'utf-8'));
//       const database = JSON.parse(fs.readFileSync('database.json', 'utf-8'));

//       const topSongs = database.topSongs;
//       const mixedSongs = database.mixedSongs;

//       // Connect to MongoDB
//       const db = await connectToMongoDB();
//       const songsCollection = db.collection('songs');

//       // Insert songs
//       await songsCollection.insertMany(songsData);
//       console.log('Songs migrated successfully');
//     } catch (error) {
//       console.error('Migration failed', error);
//     }
// }
