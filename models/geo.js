// goe.js (Geolocation Model)

let mongoose = require("mongoose");

// Geolocation schema
let geoSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  refid: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("geo", geoSchema);
