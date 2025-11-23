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

    // ✅ Validação antes de enviar para a API
    if (!state.query.trim()) {
      dispatch({ type: "SEARCH_ERROR", payload: "Por favor, digite o nome de um filme para buscar." });
      dispatch({ type: "CLEAR_RESULTS" });
      return;
    }

    dispatch({ type: "SEARCH_START" });

    try {
      const movies = await searchMovies(state.query);

      if (!movies || movies.length === 0) {
        dispatch({ type: "NO_RESULTS" });
      } else {
        dispatch({ type: "SEARCH_SUCCESS", payload: movies });
      }
    } catch (error) {
      dispatch({ type: "SEARCH_ERROR", payload: "Erro ao buscar filmes. Tente novamente." });
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

      {/* Feedbacks ao usuário */}
      {state.loading && <p>Carregando...</p>}
      {state.error && <p className="error-message">{state.error}</p>}
      {state.noResults && !state.loading && !state.error && (
        <p className="no-results">Nenhum filme encontrado com este nome.</p>
      )}

      {/* Resultados */}
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
