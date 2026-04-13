import { useEffect, useState } from "react";
import { type Movie } from "../types/movie";

export const useFavoritesInternalLogic = () => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem("@Movies:favorites");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("@Movies:favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) =>
      prev.some((f) => f.imdbID === movie.imdbID)
        ? prev.filter((f) => f.imdbID !== movie.imdbID)
        : [...prev, movie]
    );
  };

  return { favorites, toggleFavorite };
};
