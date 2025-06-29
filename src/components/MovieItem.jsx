import React from "react";
import "./styles/Movie.css"; // Assuming you have some CSS styles in Movie.css

function MovieItem({ movie, onAddFavorite }) {
  return (
    <div className="movie-item">
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <img src={movie.Poster} alt={movie.Title} />
      <p>{movie.Plot}</p>
      <p>Rating: {movie.imdbRating}</p>
      <button onClick={() => onAddFavorite(movie)}>Add to Favorites</button>
    </div>
  );
}

export default MovieItem;
