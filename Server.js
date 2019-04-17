const mongoose = require('mongoose');
const express = require('express');
var cors = require("cors");
const bodyParser = require('body-parser');
const logger = require('morgan');
const ConfigurationController = require("./controllers/ConfigurationController");

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// db instance connection
require("./config/db");

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));


// API ENDPOINT

app
  .route("/configurations")
  .get(ConfigurationController.listAllConfigurations)
  .post(ConfigurationController.createNewConfiguration);

app
  .route("/configurations/:configurationsId")
  .get(ConfigurationController.readConfiguration)
  .put(ConfigurationController.updateConfiguration)
  .delete(ConfigurationController.deleteConfiguration);


// append /api for our http requests
app.use("/api", router);


// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`)); 