const connectToMongoDB = require("../../mongodb");

const fetchStates = async (req, res) => {
  try {
    const { db } = await connectToMongoDB();
    const statesCollection = await db.collection("states");
    const states = await statesCollection.find().toArray();
    res.status(200).json(states);
  } catch (error) {
    console.error("Error performing collection operations:", error);
  }
};

module.exports = fetchStates;
