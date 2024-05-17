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

    Res.json(name, location, date, hour, imageurl);
  } catch (error) {
    console.error("error fetching events", error);

    Res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (Req, Res) => {
  try {
    const { name, location, date, totalhours, imageurl } = Req.body;
    const collection = await getCollection("FoodTruckApi", "EventsData");

    const result = await collection.insertOne({ name, location, date, totalhours, imageurl });

    Res.json({ message: "Event added successfully", result });
  } catch (error) {
    console.error("Error inserting the event", error);
    Res.status(500).json({ error: "Internal server error" });
  }
});


router.put("/:id", async (Req, Res) => {
  const { _id } = Req.params;
  const collection = await getCollection("FoodTruckApi", "EventsData");

  const MenuItems = await collection.findOne({ _id: new ObjectId(id) });
  
  const { name, date, location, totalhours, imageurl } = Req.body;

  if (!MenuItems) {
    return Res.status(404).json({ error: "Events item not found" });
  }

  const UpdateFields = {
    name: name,
    date: date,
    location: location,
    totalhours: totalhours,
    imageurl: imageurl
  };

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: UpdateFields }, // this might have to change too something else so that admin able to change all the items
  );

  Res.json({ Message: "Update complete thank you",id: "_id", updateFields: UpdateFields }); // same goes here might have to change complete
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
    return res.status(404).json({ error: "Menu item not found" });
  }

  Res.json({ Message: "Menu item deleted thank you" });
});

module.exports = router;
