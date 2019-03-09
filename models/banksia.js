// banksia.js (Banksia Model)

let mongoose = require("mongoose");

// Banksia schema
let banksiaSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  commonName: {
    type: String,
    required: false
  },
  noongarName: {
    type: String,
    required: false
  },
  desc: {
    type: String,
    required: true
  },
  habitatDesc: {
    type: String,
    required: true
  },
  flowerDesc: {
    type: [String],
    required: true
  },
  group: {
    type: String,
    required: true
  },
  otherGroupName: {
    type: String,
    required: false
  },
  flowerPeriod: {
    type: [String],
    required: false
  },
  img: {
    type: [String],
    required: false
  },
  geo: {
    type: [String],
    required: false
  }
});

module.exports = mongoose.model("Banksia", banksiaSchema);
