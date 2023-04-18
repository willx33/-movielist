import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get(`/api/movies?search=${searchTerm}`);
      setMovies(response.data);
    }

    fetchMovies();
  }, [searchTerm]);

  useEffect(() => {
    async function fetchFavorites() {
      const response = await axios.get("/api/favorites");
      setFavorites(response.data);
    }

    fetchFavorites();
  }, []);

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  async function addFavorite(movie) {
    try {
      const response = await axios.post("/api/favorites", movie);
      setFavorites((prevFavorites) => [...prevFavorites, response.data]);
    } catch (error) {
      console.error("Error adding favorite movie:", error);
    }
  }

  return (
    <div className="App">
      <h1>Popular Movies</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <h2>Search Results</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.releaseYear})
            <button onClick={() => addFavorite(movie)}>Add to Favorites</button>
          </li>
        ))}
      </ul>
      <h2>Favorite Movies</h2>
      <ul>
        {favorites.map((movie) => (
          <li key={movie._id}>
            {movie.title} ({movie.releaseYear})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
