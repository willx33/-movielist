const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const Movie = require("./models/movie");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/movies", async (req, res) => {
  const { search } = req.query;
  const apiKey = process.env.TMDB_API_KEY;
  const url = search
    ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`
    : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const movies = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      releaseYear: new Date(movie.release_date).getFullYear(),
    }));
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Error fetching movies" });
  }
});

app.post("/api/favorites", async (req, res) => {
  const { tmdbId, title, releaseYear } = req.body;
  try {
    const newFavorite = new Movie({ tmdbId, title, releaseYear });
    const savedFavorite = await newFavorite.save();
    res.status(201).json(savedFavorite);
  } catch (error) {
    console.error("Error adding favorite movie:", error);
    res.status(500).json({ message: "Error adding favorite movie" });
  }
});

app.get("/api/favorites", async (req, res) => {
  try {
    const favoriteMovies = await Movie.find();
    res.json(favoriteMovies);
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    res.status(500).json({ message: "Error fetching favorite movies" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    await mongoose.connect("mongodb+srv://willjohnsmithiii:Pineapple99@movie.hwbaelx.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
});
