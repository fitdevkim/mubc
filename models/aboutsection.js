let mongoose = require('mongoose');

// About section schema
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

let AboutSection = module.exports = mongoose.model('AboutSection', aboutsectionSchema);