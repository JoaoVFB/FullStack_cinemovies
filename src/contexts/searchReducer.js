export const initialState = {
  query: "",
  results: [],
  loading: false,
  error: null,
  noResults: false, // 👈 novo estado
};

export function searchReducer(state, action) {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload, noResults: false };
    case "SEARCH_START":
      return { ...state, loading: true, error: null, noResults: false };
    case "SEARCH_SUCCESS":
      return {
        ...state,
        loading: false,
        results: action.payload,
        noResults: action.payload.length === 0, // 👈 ativa se não houver resultados
      };
    case "SEARCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "CLEAR_RESULTS":
      return { ...state, results: [], noResults: false };
    default:
      return state;
  }
}
