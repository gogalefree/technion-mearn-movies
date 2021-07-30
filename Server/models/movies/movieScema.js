const mongoose = require('mongoose');

let MovieSchema = new mongoose.Schema({
  name: String,
  yearPremiered: String,
  imageUrl: String,
  geners: [String]
});

module.exports = mongoose.model('movies', MovieSchema);
