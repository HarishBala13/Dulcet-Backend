const connectToMongoDB = require("../../mongodb");

const fetchVisaCards = async (req, res) => {
  try {
    const { db } = await connectToMongoDB();
    const visaCollection = await db.collection("Visa");
    const visa = await visaCollection.find().toArray();
    res.status(200).json(visa);
  } catch (error) {
    console.error("Error performing collection operations:", error);
  }
};

module.exports = fetchVisaCards;
