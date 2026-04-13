import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useFavorites } from "../../hooks/useFavorites";
import { type Movie } from "../../types/movie";

interface FavoriteButtonProps {
  movie: Movie;
}

export function FavoriteButton({ movie }: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const active = isFavorite(movie.imdbID);

  return (
    <motion.button
      whileTap={{ scale: 1.05 }}
      whileHover={{ scale: 1.2 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation(); 
        toggleFavorite(movie);
      }}
      className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-all"
      aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <Heart
        size={20}
        className={`transition-all duration-550 ${
          active 
            ? "fill-red-700 text-red-600" 
            : "text-white/70 hover:text-white"
        }`}
      />
    </motion.button>
  );
}