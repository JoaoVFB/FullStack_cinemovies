export const initialState = {
  query: "",
  results: [],
  loading: false,
  error: "",
  noResults: false,
};

export function searchReducer(state, action) {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload, error: "", noResults: false };
    case "SEARCH_START":
      return { ...state, loading: true, error: "", noResults: false, results: [] };
    case "SEARCH_SUCCESS":
      return { ...state, loading: false, results: action.payload, error: "", noResults: false };
    case "NO_RESULTS":
      return { ...state, loading: false, results: [], noResults: true };
    case "SEARCH_ERROR":
      return { ...state, loading: false, error: action.payload, noResults: false };
   case "CLEAR_RESULTS":
      return { ...state, results: [], noResults: false };
    default:
      return state;
  }
}