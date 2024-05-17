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

// working
router.get("/", async (_, Res) => {
  const collection = await getCollection("FoodTruckApi", "MenuData"); // working with the Events collection
  const MenuItems = await collection.find({}).toArray();

  Res.json(MenuItems);
});

// letting the admin add menu items
// I can't test this right now don't know how to in endpoint
router.post("/", async (Req, Res) => {
  const { name, description, price, imageurl } = Req.body;
  const collection = await getCollection("FoodTruckApi", "MenuData");

  const Result = await collection.insertOne({ name, description, price, imageurl });
  Res.json({ message: "Updated Menu" });
});

// letting admin update the Menu items
// this is still throing a error saying event can't be found but its working kind of
router.put("/:id", async (Req, Res) => {
  const { id } = Req.params;
  const collection = await getCollection("FoodTruckApi", "MenuData");

  const MenuItems = await collection.findOne({ _id: new ObjectId(id) });
  
  const { name, imageurl, description, price } = Req.body;

  if (!MenuItems) {
    return Res.status(404).json({ error: "Menu item not found" });
  }

  const UpdateFields = {
    name: name,
    imageUrl: imageUrl,
    description: description,
    price: price
  };

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: UpdateFields }, // this might have to change too something else so that admin able to change all the items
  );

  Res.json({ Message: "Update complete thank you",id: "id", updateFields: UpdateFields }); // same goes here might have to change complete
});


//this is working 
router.delete("/:id", async (Req, Res) => {
  try {
    const { id } = Req.params;

    if (!ObjectId.isValid(id)) {
      return Res.status(400).json({ error: "Invalid ID format" });
    }

    const collection = await getCollection("FoodTruckApi", "MenuData");
    const itemToDelete = await collection.findOne({ _id: new ObjectId(id) });

    if (!itemToDelete) {
      console.log("Item not found for ID:", id);
      return Res.status(404).json({ error: "Menu item not found" });
    }

    await collection.deleteOne({ _id: new ObjectId(id) });

    Res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting the menu item", error);
    Res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
