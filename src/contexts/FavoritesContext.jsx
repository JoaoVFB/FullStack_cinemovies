import { createContext, useContext, useReducer } from "react";
import { favoritesReducer, initialFavoritesState } from "./favoritesReducer";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialFavoritesState);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
