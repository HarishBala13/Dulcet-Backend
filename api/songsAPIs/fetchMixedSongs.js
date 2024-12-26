const connectToMongoDB = require("../../mongodb");

const fetchMixedSongs = async (req, res) => {
  try {
    const { db } = await connectToMongoDB();
    const mixedSongsCollection = await db.collection("mixedSongs");
    const mixedSongs = await mixedSongsCollection.find().toArray();
    res.status(200).json(mixedSongs);
  } catch (error) {
    console.error("Error performing collection operations:", error);
  }
};

module.exports = fetchMixedSongs;
