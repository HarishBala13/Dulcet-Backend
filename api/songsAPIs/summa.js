// import * as fs from 'fs';
// import * as path from 'path';
// import * as stream from 'stream';

// async function uploadSongsToMongoDB(database) {
//   // Use bulk operations for efficiency
//   const bulkOps = [];

//   // Process each movie group
//   for (const movieGroup of database.topSongs) {
//     const movieName = movieGroup.movieName;
//     const songs = [];

//     // Process each song in the movie group
//     for (const song of movieGroup[Object.keys(movieGroup)[1]]) {
//       try {
//         // Image processing with stream
//         const imageBuffer = await processFile(song.images);
//         const audioBuffer = await processFile(song.audios);

//         songs.push({
//           ...song,
//           images: {
//             data: imageBuffer,
//             contentType: getFileContentType(song.images),
//             originalPath: song.images
//           },
//           audios: {
//             data: audioBuffer,
//             contentType: getFileContentType(song.audios),
//             originalPath: song.audios
//           }
//         });
//       } catch (error) {
//         console.error(`Error processing song ${song.song_name}:`, error);
//       }
//     }

//     // Bulk write operation
//     bulkOps.push({
//       updateOne: {
//         filter: { movieName },
//         update: { 
//           $set: { 
//             movieName, 
//             songs 
//           }
//         },
//         upsert: true
//       }
//     });
//   }

//   // Perform bulk write with error handling
//   try {
//     await TopSongModel.bulkWrite(bulkOps, { ordered: false });
//     console.log('Songs uploaded successfully');
//   } catch (error) {
//     console.error('Bulk upload error:', error);
//   }
// }

// // Stream-based file processing
// async function processFile(filePath: string): Promise<Buffer> {
//   return new Promise((resolve, reject) => {
//     const fullPath = path.join(__dirname, filePath);
    
//     // Use streams for large files
//     const readStream = fs.createReadStream(fullPath);
//     const chunks: Buffer[] = [];

//     readStream.on('data', (chunk) => chunks.push(chunk));
//     readStream.on('end', () => resolve(Buffer.concat(chunks)));
//     readStream.on('error', reject);
//   });
// }

// // Content type detection
// function getFileContentType(filePath: string): string {
//   const ext = path.extname(filePath).toLowerCase();
//   const contentTypes = {
//     '.png': 'image/png',
//     '.jpg': 'image/jpeg',
//     '.jpeg': 'image/jpeg',
//     '.mp3': 'audio/mpeg',
//     default: 'application/octet-stream'
//   };
//   return contentTypes[ext] || contentTypes.default;
// }
