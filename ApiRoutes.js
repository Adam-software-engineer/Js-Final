const { MongoClient, ObjectId } = require("mongodb");
const router = require("express").Router();
const url = process.env.MONGODB_URI || require("./secrets/mangodb.json").url;
const client = new MongoClient(url);

const getCollection = async (dbName, collectionName) => {
  await client.connect();
  return client.db(dbName).collection(collectionName);
};

// letting user see all the menu items.
router.get("/", async (_, Res) => {
  const collection = await getCollection("FoodTruckApi", "Menu"); // working with the Events collection
  const MenuItems = await collection.find({}).toArray();

  // making all the _id and turning them into normal id's
  const UpdatedMenuItems = MenuItems.map((MI) => {
    const { _id, ...rest } = MI;
    return { id: _id, ...rest };
  });

  Res.json(UpdatedMenuItems);
});

// letting the admin add menu items
router.post("/", async (Req, Res) => {
  const { Name, Discription, Price } = Req.body;
  const collection = await getCollection("FoodTruckApi", "Menu");

  const Result = await collection.insertOne({ Name, Discription, Price });
  Res.json({ message: "Updated Menu" });
});

// letting admin update the Menu items
router.put("/:id", async (Req, Res) => {
  const { id } = Req.params;
  const collection = await getCollection("FoodTruckApi", "Menu");

  const MenuItems = await collection.findOne({ _id: new ObjectId(id) });

  if (!MenuItems) {
    return Res.status(404).json({ error: "Menu item not found" });
  }

  const UpdateComplete = !MenuItems.complete;
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { complete: UpdateComplete } }, // this might have to change too something else so that hes able to change all the items
  );

  Res.json({ id: "_id", complete: UpdateComplete }); // same goes here might have to change complete
});

// Events Api grabs.
router.get("/", async (Req, Res) => {
  const collection = await getCollection("FoodTruckApi", "Events"); // working with the menu collection
});

module.exports = router;
