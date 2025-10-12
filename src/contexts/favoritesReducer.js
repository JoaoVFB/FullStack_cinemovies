export const initialFavoritesState = {
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

export function favoritesReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      // Evita duplicados
      if (state.favorites.find((m) => m.id === action.payload.id)) {
        return state;
      }
      const added = [...state.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(added));
      return { favorites: added };

    case "REMOVE_FAVORITE":
      const removed = state.favorites.filter((m) => m.id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(removed));
      return { favorites: removed };

    default:
      return state;
  }
}
