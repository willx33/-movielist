const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const Movie = require("./models/movie");


app.get("/api/movies", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
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
