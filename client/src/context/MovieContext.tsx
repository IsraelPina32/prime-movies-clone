import  { createContext, useContext, useState, type ReactNode, useEffect, useMemo, useCallback, use } from "react";
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
  selectedType: '' | 'movie' | 'series';
  setSelectedType: (value: '' | 'movie' | 'series') => void;
  searchMovies: (options: SearchOptions) => Promise<void>;
  currentPage: number,
  setCurrentPage: (page: number) => void;
  totalResults: number; 
};

interface SearchOptions  {
   query: string, 
   genre?: string, 
   year?: string,
   page?: number;
   type?: string;
};

const MovieContext = createContext<MovieContextData>({} as MovieContextData);

export const MovieProvider = ({ children }: { children: ReactNode }) => {

  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('@PrimeSearch:searchTerm') || '');

  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [ selectedType, setSelectedType] = useState<'' | 'movie' | 'series'>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedTerm = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchMovies = useCallback(async ({query, genre = '', year = '', page = 1, type = ''}: SearchOptions) => {
    if (!query.trim() && !genre && !year) {
      setMovies([]);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data: any = await movieService.searchMovies(query, genre, year, Number(page), type);
     
      if (data && data.Search && Array.isArray(data.Search)) {
        const mappeMovies: Movie[] = data.Search.map((m: any) => ({
          id: m.imdbID || m.id,
          imdbID: m.imdbID,
          Title: m.Title,
          Year: m.Year,
          Type: m.Type || 'movie',
          Poster: m.Poster === 'N/A' ? null : m.Poster
        }));
        setMovies(mappeMovies);
        setTotalResults(Number(data.totalResults));
      } else {
        setMovies([]);
        setTotalResults(0);
        if( data && data.Error !== 'Movie not found!') setError(data.Error);
      }
    } catch (err) {
      setError("Falha na conexão com o servidor.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const term = debouncedTerm.trim();

    if(term) {
       fetchMovies({query: debouncedTerm, genre: selectedGenre !== "" ? selectedGenre : undefined, year: selectedYear !== "" ? selectedYear : undefined, page: currentPage, type: selectedType || undefined});
       localStorage.setItem('@PrimeSearch:searchTerm', debouncedTerm);
    }
  }, [debouncedTerm, selectedGenre, selectedYear, currentPage, selectedType, fetchMovies]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedTerm, selectedGenre, selectedYear, selectedType])

  const value = useMemo(() => ({
    searchTerm, setSearchTerm, movies, loading, error, searchMovies: fetchMovies, selectedGenre, setSelectedGenre, selectedYear, setSelectedYear, selectedType, setSelectedType, currentPage, setCurrentPage, totalResults
  }), [searchTerm, setSearchTerm, movies, loading, error, fetchMovies, selectedYear, selectedGenre, selectedType, currentPage, totalResults]);

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);