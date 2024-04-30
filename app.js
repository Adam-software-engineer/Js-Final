const express = require("express");
const app = express();
const path = require("path");
const Root = path.join(__dirname, "public");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (_, response) => {
  response.sendfile(path.join(Root, "index.html"));
});

// this is all the calls too the apiroutes code too the DB
app.use("/api/menu", require("./ApiRoutes.js"));
app.use("/api/events", require("./ApiRoutes.js"));

const message = `Server running: http://localhost:${port}`;
app.listen(port, () => console.log(message));
