import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get("/api/movies");
      setMovies(response.data);
    }

    fetchMovies();
  }, []);

  return (
    <div className="App">
      <h1>Popular Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            {movie.title} ({movie.releaseYear})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
