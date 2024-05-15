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

router.put("/:id", async (Req, Res) => {
  try {
    const { id } = Req.params;
    const collection = await getCollection("FoodTruckApi", "EventsData");

    const { name, location } = Reqt.body;

    const event = await collection.findOneAndUpdate(
      id,
      { name, location },
      { new: true },
    );

    Response.json(event);
  } catch (error) {
    console.error("error updating event", error);
    Response.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (Request, Response) => {
  try {
    const { id } = Request.params;
    const collection = await getCollection("FoodTruckApi", "EventsData");

    const DeletedItem = await collection.findOne({ id });

    if (!DeletedItem) {
      return Response.status(404).json({ error: "Could not find item id" });
    }

    await collection.deleteOne({ id });

    Response.json({ Message: "Menu item deleted thank you" });
  } catch (error) {
    console.error("error deleteing the event", error);
    Response.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
