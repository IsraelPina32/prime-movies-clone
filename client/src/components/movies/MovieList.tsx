import { Reorder } from "framer-motion";
import { MovieCard } from "./MovieCard";
import type { Movie } from '../../types/movie';

interface MovieListProps {
  movies: Movie[];
  onReorder: (newOrder: Movie[]) => void;
}

export const MovieList = ({ movies, onReorder }: MovieListProps) => {
  return (
    <Reorder.Group 
      axis="x" 
      values={movies} 
      onReorder={onReorder}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-10 justify-items-center w-full p-3"
      style={{ scrollbarWidth: 'none' }} 
    >
      {movies.map((movie) => (
        <Reorder.Item
          key={movie.imdbID}
          value={movie}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={1}
          className="w-full max-w-[260px] sm:max-w-[200px] lg:max-w-[5540px] cursor-grab active:cursor-grabbing"
          whileDrag={{ 
            scale: 1.05,
            zIndex: 100,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 150, 
            damping: 20,   
            mass: 0.5    
          }}
        >
          <MovieCard movie={movie} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};