const connectToMongoDB = require("../../mongodb");

const fetchPremium = async (req, res) => {
  try {
    const { db } = await connectToMongoDB();
    const premiumCollection = await db.collection("premium");
    const premium = await premiumCollection.find().toArray();
    res.status(200).json(premium);
  } catch (error) {
    console.error("Error performing collection operations:", error);
  }
};

module.exports = fetchPremium;
