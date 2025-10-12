import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./favoritesPage.css";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  return (
    <div className="favorites-page">
      <h2>Meus Favoritos</h2>
      {favorites.length === 0 ? (
        <p>Nenhum filme favorito ainda 😢</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
