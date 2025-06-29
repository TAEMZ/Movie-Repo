import React from "react";
import MovieItem from "./MovieItem";

function MovieList({ movies, onAddFavorite }) {
  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieItem
            key={movie.imdbID}
            movie={movie}
            onAddFavorite={onAddFavorite}
          />
        ))
      ) : (
        <p>No movies found. Try a different search.</p>
      )}
    </div>
  );
}
