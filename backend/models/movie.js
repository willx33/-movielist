const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  releaseYear: Number,
});

module.exports = mongoose.model("Movie", movieSchema);
