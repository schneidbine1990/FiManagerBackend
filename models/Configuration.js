const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConfigurationSchema = new Schema({
  configurationName: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },

});

module.exports = mongoose.model("Configuration", ConfigurationSchema);
