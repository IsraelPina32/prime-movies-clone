import  { createContext, useContext, useState, type ReactNode, useEffect, useMemo, useCallback } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { movieService } from "../services/movieService";
import type { Movie } from "../types/movie";

interface MovieContextData {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  movies: Movie[];
  loading: boolean;
  error: string | null;
  selectedGenre: string;
  setSelectedGenre: (value: string) => void;
  selectedYear: string,
  setSelectedYear: (value: string) => void;
  searchMovies: (query: string, genre: string, year: string) => Promise<void>;
}

const MovieContext = createContext<MovieContextData>({} as MovieContextData);

export const MovieProvider = ({ children }: { children: ReactNode }) => {

  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('@PrimeSearch:searchTerm') || '');

  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedTerm = useDebounce(searchTerm, 500);

  const fetchMovies = useCallback(async (query: string, genre: string, year: string) => {
    if (!query.trim() && !genre && !year) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await movieService.searchMovies(query, genre, year);
     
      if (data && data.length > 0) {
        const mappeMovies: Movie[] = data.map((m: any) => ({
          id: m.imdbID || m.id,
          imdbID: m.imdbID,
          Title: m.Title,
          Year: m.Year,
          Type: m.Type || 'movie',
          Poster: m.Poster === 'N/A' ? null : m.Poster
        }));
        setMovies(mappeMovies)
      } else {
        setMovies([]);
        setError(null);
        return;
      }
    } catch (err) {
      setError("Falha na conexão com o servidor.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(debouncedTerm, selectedGenre, selectedYear);
    localStorage.setItem('@PrimeSearch:searchTerm', debouncedTerm);
  }, [debouncedTerm, selectedGenre, selectedYear, fetchMovies]);

  const value = useMemo(() => ({
    searchTerm, setSearchTerm, movies, loading, error, searchMovies: fetchMovies, selectedGenre, setSelectedGenre, selectedYear, setSelectedYear
  }), [searchTerm, setSearchTerm, movies, loading, error, fetchMovies, selectedYear, selectedGenre]);

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);