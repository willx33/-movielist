const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  tmdbId: Number,
  title: String,
  releaseYear: Number,
});

module.exports = mongoose.model("Movie", movieSchema);
