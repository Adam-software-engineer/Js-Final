const { MongoClient, ObjectId } = require("mongodb");
const router = require("express").Router();
const url = process.env.MONGODB_URI || require("./secrets/mangodb.json").url;
const client = new MongoClient(url);

const getCollection = async (dbName, collectionName) => {
  await client.connect();
  return client.db(dbName).collection(collectionName);
};

router.get("/", async (Req, Res) => {
  const collection = await getCollection("FoodTruckApi", "Events"); // working with the Events collection
});

router.get("/", async (Req, Res) => {
  const collection = await getCollection("FoodTruckApi", "Menu"); // working with the menu collection
});

module.exports = router;
