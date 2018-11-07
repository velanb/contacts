//Importing packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
//initializing App
const app = express();

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//for routes
const contacts = require("./routes/api/contacts");

//serve static assets in prod
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

//Port setup
const port = process.env.PORT || 5000;

//DB config
const db = require("./config/keys").mongoURI;

//connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`MongoDB connected!`))
  .catch(err => console.log(err));

//Using the routes
app.use("/api", contacts);

//GET api
app.get("/", (req, res) => {
  res.send({ msg: "Node server" });
});

app.listen(port, () => {
  console.log(`Node server is up and listening to port ${port}`);
});
