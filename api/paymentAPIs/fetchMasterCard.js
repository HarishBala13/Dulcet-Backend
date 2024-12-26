const connectToMongoDB = require("../../mongodb");

const fetchMasterCard = async (req, res) => {
  try {
    const { db } = await connectToMongoDB();
    const masterCardCollection = await db.collection("Mastercard");
    const mastercard = await masterCardCollection.find().toArray();
    res.status(200).json(mastercard);
  } catch (error) {
    console.error("Error performing collection operations:", error);
  }
};

module.exports = fetchMasterCard;
