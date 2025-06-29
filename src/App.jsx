import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import Sidebar from "./components/Sidebar";
import axios from "axios";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch movies from the API
  const fetchMovies = async (params) => {
    try {
      const response = await axios.get("http://www.omdbapi.com/", {
        params: {
          apikey: "c11ff2ce",
          ...params,
        },
      });

      const moviesWithDetails = await Promise.all(
        (response.data.Search || []).map(async (movie) => {
          const details = await axios.get("http://www.omdbapi.com/", {
            params: {
              apikey: "c11ff2ce",
              i: movie.imdbID,
            },
          });
          return details.data;
        })
      );

      setMovies(moviesWithDetails);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Fetch movies by different categories
  const fetchGenreMovies = (genre) => {
    setSelectedCategory("Genre");
    fetchMovies({ s: genre });
  };

  const fetchPopularMovies = () => {
    setSelectedCategory("Popular");
    fetchMovies({ s: "avengers" });
  };

  const fetchTopRatedMovies = () => {
    setSelectedCategory("Top Rated");
    fetchMovies({ s: "inception" });
  };

  const fetchUpcomingMovies = () => {
    setSelectedCategory("Upcoming");
    fetchMovies({ s: "2023" });
  };

  const fetchNowPlayingMovies = () => {
    setSelectedCategory("Now Playing");
    fetchMovies({ s: "2024" });
  };

  const searchMovies = async (query) => {
    await fetchMovies({ s: query });
  };

  // Add a movie to favorites
  const addFavorite = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Remove a movie from favorites
  const removeFavorite = (imdbID) => {
    const updatedFavorites = favorites.filter(
      (movie) => movie.imdbID !== imdbID
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Retrieve favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="App">
      <Sidebar
        onGenreClick={fetchGenreMovies}
        onPopularClick={fetchPopularMovies}
        onTopRatedClick={fetchTopRatedMovies}
        onUpcomingClick={fetchUpcomingMovies}
        onNowPlayingClick={fetchNowPlayingMovies}
        onFavoritesClick={() => setSelectedCategory("Favorites")}
      />
      <div className="content">
        <h1 className="mainh">Movie Database</h1>
        <SearchBar onSearch={searchMovies} />
        {selectedCategory === "Favorites" ? (
          <div className="fav-container">
            <h2>Favorites</h2>
            <div className="fav-movies">
              {favorites.length > 0 ? (
                favorites.map((movie) => (
                  <div key={movie.imdbID} className="movie-card">
                    <img src={movie.Poster} alt={movie.Title} />
                    <div className="movie-info">
                      <h3>{movie.Title}</h3>
                      <p>{movie.Year}</p>
                      <button onClick={() => removeFavorite(movie.imdbID)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No favorites added yet</p>
              )}
            </div>
          </div>
        ) : (
          <MovieList movies={movies} onAddFavorite={addFavorite} />
        )}
      </div>
    </div>
  );
}

export default App;
