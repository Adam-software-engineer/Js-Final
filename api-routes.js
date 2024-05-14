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
  const collection = await getCollection("FoodTruckApi", "Menu"); // working with the Events collection
  const MenuItems = await collection.find({}).toArray();

  Res.json(MenuItems);
});

// letting the admin add menu items
router.post("/", async (Req, Res) => {
  const { Name, Discription, Price } = Req.body;
  const collection = await getCollection("FoodTruckApi", "Menu");

  const Result = await collection.insertMany({ Name, Discription, Price });
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
    { $set: { complete: UpdateComplete } }, // this might have to change too something else so that admin able to change all the items
  );

  Res.json({ id: "_id", complete: UpdateComplete }); // same goes here might have to change complete
});

router.delete("/:id", async (Req, Res) => {
  // letting admin delete a menu item
  const { id } = Req.params;
  const collection = await getCollection("FoodTruckApi", "Menu");

  const DeletedItem = await collection.findOne({ id });

  if (!DeletedItem) {
    return Res.status(404).json({ error: "Could not find item id" });
  }

  await collection.deleteOne({ id });

  Res.json({ Message: "Menu item deleted thank you" });
});

//--------//
//--------//

// food truck events

router.get("/", async (_, Res) => {
  const collection = await getCollection("FoodTruckApi", "Events"); // working with the menu collection
  const events = await collection.find({}).toArray();

  Res.json(events);
});

router.get("/:id", async (Req, Res) => {
  try {
    const { id } = Req.params;
    const collection = await getCollection("FoodTruckApi", "Events");

    const events = await collection.findbyid({ id });

    const { name, location, date, hour } = events;

    Res.json(name, location, date, hour);
  } catch (error) {
    console.error("error fetching events", error);

    Res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (Request, Response) => {
  try {
    const { name, location, date, hour } = Request.body;
    const collection = await getCollection("FoodTruckApi", "Events");

    const result = await collection.insertMany({ name, location, date, hour });

    Response.json({ Messages: "Updated events" });
  } catch (error) {
    console.error("error inserting the event", error);
    Response.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (Request, Response) => {
  try {
    const { id } = Request.params;
    const collection = await getCollection("FoodTruckApi", "Events");

    const { name, location } = Request.body;

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
    const collection = await getCollection("FoodTruckApi", "Events");

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
