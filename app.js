const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// app.use("", require("./ApiRoutes.js"))

const message = `Server running: http://localhost:${port}`;
app.listen(port, () => console.log(message));
