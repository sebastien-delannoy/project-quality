// this model indicates to the controller how the data are being organized

const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  rank: String,
  thumbnail: String,
  year: String,
  url: String,
  genre: String,
  synopsis: String,
  director: String,
  actors: String,
});

module.exports = mongoose.model("movie", schema);
