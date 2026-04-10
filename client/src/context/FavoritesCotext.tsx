import  { createContext, useContext, useState, useEffect, type ReactNode} from "react";

import { type Movie } from "../types/movie";

interface FavoritesContextData {
    favorites: Movie[];
    toggleFavorite: (movie: Movie) => void;
    isFavorite: (movieID: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);

export const FavoritesProvider = ({ children }: { children: ReactNode}) => {
        const [favorites, setFavorites] = useState<Movie[]>(() => {
            const savedFavorites = localStorage.getItem("@Movies:favorites");
            return savedFavorites ? JSON.parse(savedFavorites) : []
        });

        useEffect(() => {
           localStorage.setItem("@Movies:favorites", JSON.stringify(favorites));
        }, [favorites]);


        const toggleFavorite = (movie: Movie) => {
            setFavorites((prevFavorites) => {
                const isAlreadyFavorite = prevFavorites.some((fav) => fav.imdbID === movie.imdbID);
                if (isAlreadyFavorite) {
                    return prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
                };
                return [...prevFavorites, movie];
            });
        };

        const isFavorite = (id: string) => favorites.some((fav) => fav.imdbID === id);

    return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);