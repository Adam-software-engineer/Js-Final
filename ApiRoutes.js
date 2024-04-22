const { MongoClient, ObjectId } = require("mongodb");
const router = require("express").Router();
const url = process.env.MONGODB_URI || require("./secrets/mangodb.json").url;
const client = new MongoClient(url);

const getCollection = async (dbName, collectionName) => {
  await client.connect();
  return client.db(dbName).collection(collectionName);
};

// GET /api/menu - This route should return a list of all items on the menu. The response should be a JSON array of items. The items should include an id, name, description, and price.
//
// POST /api/menu - This route should allow the food truck owner to add a new item to the menu. The request body should contain the item name, description, and price.
//
// PUT /api/menu/:id - This route should allow the food truck owner to update an item on the menu. The route should accept an item ID as a parameter and update the item's name, description, and price.
//
// DELETE /api/menu/:id - This route should allow the food truck owner to delete an item from the menu. The route should accept an item ID as a parameter and remove the item from the menu.
//
// GET /api/events - This route should return a list of all events where the food truck will be located. The response should be a JSON array of events. The events should include an id, and the name of the event.
//
// GET /api/events/:id - This route should return a single event by ID. The route should accept an event ID as a parameter and return the event's name, location, dates, and hours.
//
// POST /api/events - This route should allow the food truck owner to add a new event. The request body should contain the event name, location, dates, and hours.
//
// PUT /api/events/:id - This route should allow the food truck owner to update an event. The route should accept an event ID as a parameter and update the event's name, location, dates, and hours.
//
// DELETE /api/events/:id - This route should allow the food truck owner to delete an event. The route should accept an event ID as a parameter and remove the event from the list of events.

router.get("/", async (Req, Res) => {});

router.get("/", async (Req, Res) => {
  const collection = await getCollection("Js-Final", "FinalApi");
});

module.exports = router;
