import { createContext, type ReactNode } from "react";
import { type Movie } from "../types/movie";
import { useFavoritesInternalLogic } from "../hooks/useFavoritesLogic";

interface FavoritesContextData {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieID: string) => boolean;
} 

export const FavoritesContext = createContext<FavoritesContextData | undefined>(undefined);


export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const logic = useFavoritesInternalLogic();

  return (
    <FavoritesContext.Provider 
      value={{ 
        ...logic, 
        isFavorite: (id) => logic.favorites.some((f) => f.imdbID === id) 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};