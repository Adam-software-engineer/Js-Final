const { MongoClient, ObjectId } = require("mongodb");
const router = require("express").Router();
const url = process.env.MONGODB_URI || require("./secrets/mangodb.json").url;
const client = new MongoClient(url);

const getCollection = async (dbName, collectionName) => {
  await client.connect();
  return client.db(dbName).collection(collectionName);
};

// food truck events

router.get("/", async (_, Res) => {
  const collection = await getCollection("FoodTruckApi", "EventsData"); // working with the menu collection
  const events = await collection.find({}).toArray();

  Res.json(events);
});

router.get("/:id", async (Req, Res) => {
  try {
    const { id } = Req.params;
    const collection = await getCollection("FoodTruckApi", "EventsData");

    const events = await collection.findbyid({ id });

    const { name, location, date, hour } = events;

    Res.json(name, location, date, hour);
  } catch (error) {
    console.error("error fetching events", error);

    Res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (Req, Res) => {
  try {
    const { name, location, date, hour } = Req.body;
    const collection = await getCollection("FoodTruckApi", "EventsData");

    const result = await collection.insertMany({ name, location, date, hour });

    Res.json({ Messages: "Updated events" });
  } catch (error) {
    console.error("error inserting the event", error);
    Res.status(500).json({ error: "Internal server error" });
  }
});

// this is throwing a 24 char string error nto a 12 byte array 
router.put("/:id", async (Req, Res) => {
  const { id } = Req.params;
  const collection = await getCollection("FoodTruckApi", "EvemtsData");

  const MenuItems = await collection.findOne({ _id: new ObjectId(id) });
  
  const { name, date, location, totalhours } = Req.body;

  if (!MenuItems) {
    return Res.status(404).json({ error: "Events item not found" });
  }

  const UpdateFields = {
    Name: name,
    date: date,
    location: location,
    totalhours: totalhours
  };

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: UpdateFields }, // this might have to change too something else so that admin able to change all the items
  );

  Res.json({ Message: "Update complete thank you",id: "id", updateFields: UpdateFields }); // same goes here might have to change complete
});

router.delete("/:id", async (Req, Res) => {

  const { id } = Req.params;
  const collection = await getCollection("FoodTruckApi", "EventsData");

  const deletedItem = await collection.findOne({ _id: new ObjectId(id) });


  if (!ObjectId.isValid(id)) {
    return Res.status(404).json({ error: "Could not find item id" });
  }
  
  await collection.deleteOne({ _id: new ObjectId(id) });
  
  if (!deletedItem) {
    console.log("Item not found for ID:", id);
    return Res.status(404).json({ error: "Events item not found" });
  }
  
  Res.json({ Message: "Events item deleted thank you" });
});

module.exports = router;
