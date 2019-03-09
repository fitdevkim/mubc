// aboutsection.js (About Section Model)

let mongoose = require("mongoose");

// About Section schema
let aboutsectionSchema = mongoose.Schema({
  sectionType: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("AboutSection", aboutsectionSchema);
