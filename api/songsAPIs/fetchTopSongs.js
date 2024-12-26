const connectToMongoDB = require("../../mongodb");

const fetchTopSongs = async (req, res) => {
  try {
    const { db } = await connectToMongoDB();
    const topSongsCollection = await db.collection("topSongs");
    const topSongs = await topSongsCollection.find().toArray();
    res.status(200).json(topSongs);
  } catch (error) {
    console.error("Error performing collection operations:", error);
  }
};

module.exports = fetchTopSongs;
