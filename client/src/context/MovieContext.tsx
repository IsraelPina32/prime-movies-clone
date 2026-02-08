import  { createContext, useContext, useState, type ReactNode, useEffect, useMemo } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { movieService } from "../services/movieService";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieContextData {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  movies: Movie[];
  loading: boolean;
  error: string | null;
  searchMovies: (query: string) => Promise<void>;
}

const MovieContext = createContext<MovieContextData>({} as MovieContextData);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState(() => {
     return localStorage.getItem('@PrimeSearch:searchTerm') || '';
  });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedTerm = useDebounce(searchTerm, 500);

  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await movieService.searchMovies(query);
      setMovies(data);

      if (data && data.length > 0) {
        setMovies(data);
      } else {
        setMovies([]);
        setError(" Unknown result from movie service.");
      }
    } catch (err) {
      setError("Falha na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedTerm) {
      searchMovies(debouncedTerm);
    } else {
      setMovies([]);
    }
  }, [debouncedTerm]);

  const value = useMemo(() => ({
    searchTerm, setSearchTerm, movies, loading, error, searchMovies
  }), [searchTerm, setSearchTerm, movies, loading, error, searchMovies]);

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);