const connectToMongoDB = require("../../mongodb");

const fetchRegisteredUser = async (req, res) => {
  //   const { query } = req.body;
  try {
    const { db } = await connectToMongoDB();
    const usersCollection = await db.collection("usersregister");
    const users = await usersCollection.find().toArray();
    console.log(`Users: `, users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error performing collection operations:", error);
  }
};

module.exports = fetchRegisteredUser;
