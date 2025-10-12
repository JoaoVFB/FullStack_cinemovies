import './movieCard.css';
import { useState } from 'react';
import { useFavorites } from "../contexts/FavoritesContext";

function MovieCard({ movie }) {
   const { state, dispatch } = useFavorites();
   const isFavorite = state.favorites.some((fav) => fav.id === movie.id);

   const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: movie.id });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: movie });
    }
  };

  return (
    <div className="movie-card" onClick={toggleFavorite}>
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <div className="movie-overlay">
        <h3>{movie.title}</h3>
        <p>⭐ {movie.rating.toFixed(1)}</p>
        <p className="year">{movie.year}</p>
        <button
        onClick={toggleFavorite}
        className={`fav-btn ${isFavorite ? "active" : ""}`}
      >
        {isFavorite ? "❤️ Remover" : "🤍 Favoritar"}
      </button>
      </div>
    </div>
  );
}

export default MovieCard;
