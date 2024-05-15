const { MongoClient, ObjectId } = require("mongodb");
const router = require("express").Router();
const url = process.env.MONGODB_URI || require("./secrets/mangodb.json").url;
const client = new MongoClient(url);

const getCollection = async (dbName, collectionName) => {
  await client.connect();
  return client.db(dbName).collection(collectionName);
};

//-----//
// food truck menu items

router.get("/", async (_, Res) => {
  const collection = await getCollection("FoodTruckApi", "MenuData"); // working with the Events collection
  const MenuItems = await collection.find({}).toArray();

  Res.json(MenuItems);
});

// letting the admin add menu items
router.post("/", async (Req, Res) => {
  const { Name, Discription, Price } = Req.body;
  const collection = await getCollection("FoodTruckApi", "MenuData");

  const Result = await collection.insertMany({ Name, Discription, Price });
  Res.json({ message: "Updated Menu" });
});

// letting admin update the Menu items
router.put("/:id", async (Req, Res) => {
  const { id } = Req.params;
  const collection = await getCollection("FoodTruckApi", "MenuData");

  const MenuItems = await collection.findOne({ _id: new ObjectId(id) });

  if (!MenuItems) {
    return Res.status(404).json({ error: "Menu item not found" });
  }

  const UpdateComplete = !MenuItems.complete;
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { complete: UpdateComplete } }, // this might have to change too something else so that admin able to change all the items
  );

  Res.json({ id: "_id", complete: UpdateComplete }); // same goes here might have to change complete
});

router.delete("/:id", async (Req, Res) => {
  // letting admin delete a menu item
  const { id } = Req.params;
  const collection = await getCollection("FoodTruckApi", "MenuData");

  const DeletedItem = await collection.findOne({ id });

  if (!DeletedItem) {
    return Res.status(404).json({ error: "Could not find item id" });
  }

  await collection.deleteOne({ id });

  Res.json({ Message: "Menu item deleted thank you" });
});

module.exports = router;