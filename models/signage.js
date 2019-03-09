// signage.js (Signage Model)

let mongoose = require("mongoose");

// Signage schema
let signageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  img: {
    type: [String],
    required: false
  }
});

module.exports = mongoose.model("signage", signageSchema);
