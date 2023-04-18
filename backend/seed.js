const mongoose = require("mongoose");
const Movie = require("./models/movie");

const movies = [
  { title: "The Shawshank Redemption", releaseYear: 1994 },
  { title: "The Godfather", releaseYear: 1972 },
  { title: "Pulp Fiction", releaseYear: 1994 },
];

async function seedDB() {
  try {
    await mongoose.connect("mongodb+srv://willjohnsmithiii:Pineapple99@movie.hwbaelx.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Movie.insertMany(movies);
    console.log("Database seeded!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDB();
