import { useReducer } from "react";
import { searchMovies } from "../contexts/api";
import MovieCard from "./MovieCard";
import "./searchBar.css";
import searchIcon from "../assets/search.png";
import { searchReducer, initialState } from "../contexts/searchReducer";

function SearchBar() {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!state.query.trim()) return;

    dispatch({ type: "SEARCH_START" });

    try {
      const movies = await searchMovies(state.query);
      dispatch({ type: "SEARCH_SUCCESS", payload: movies });
    } catch (error) {
      dispatch({ type: "SEARCH_ERROR", payload: error.message });
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    dispatch({ type: "SET_QUERY", payload: value });

    if (value.trim() === "") {
      dispatch({ type: "CLEAR_RESULTS" });
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Buscar filmes..."
          value={state.query}
          onChange={handleInputChange}
        />
        <button type="submit">
          <img src={searchIcon} className="search-icon" alt="SearchIcon" />
        </button>
      </form>

      {state.loading && <p>Carregando...</p>}
      {state.error && <p>Erro: {state.error}</p>}

      
      {state.noResults && !state.loading && !state.error && (
        <p className="no-results">Nenhum filme encontrado com este nome </p>
      )}

      {Array.isArray(state.results) && state.results.length > 0 && (
        <div className="search-results">
          <h2>Resultados para: "{state.query}"</h2>
          <div className="results-grid">
            {state.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
