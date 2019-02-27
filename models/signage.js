let mongoose = require('mongoose');

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

let Signage = module.exports = mongoose.model('signage', signageSchema);