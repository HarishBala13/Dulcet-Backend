const connectToMongoDB = require("../../mongodb");

const fetchRegisteredUser = async (req, res) => {
  try {
    const { db } = await connectToMongoDB();
    const usersCollection = await db.collection("usersregister");
    const users = await usersCollection.find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error performing collection operations:", error);
  }
};

module.exports = fetchRegisteredUser;
