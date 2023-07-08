// jshint esversion: 6

const connectToMongoDB = require("./DB");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

connectToMongoDB();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("<h1><em>Hello World!</em></h1>");
});

app.listen(5000, () => {
  console.log("server at port: 3000!");
});
