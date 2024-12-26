const connectToMongoDB = require("../../mongodb");

const fetchSearchBoxes = async (req, res) => {
  try {
    const { db } = await connectToMongoDB();
    const searchBoxesCollection = await db.collection("searchBoxes");
    const searchBoxes = await searchBoxesCollection.find().toArray();
    res.status(200).json(searchBoxes);
  } catch (error) {
    console.error("Error performing collection operations:", error);
  }
};

module.exports = fetchSearchBoxes;
