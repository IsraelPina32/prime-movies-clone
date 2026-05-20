import { createContext, useState, type ReactNode, useEffect, useMemo, useCallback } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { movieService } from "../services/movieService";
import type { Movie } from "../types/movie";

interface MovieContextData {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  loading: boolean;
  error: string | null;
  selectedGenre: string;
  setSelectedGenre: (value: string) => void;
  selectedYear: string,
  setSelectedYear: (value: string) => void;
  selectedType: '' | 'movie' | 'series';
  setSelectedType: (value: '' | 'movie' | 'series') => void;
  selectedRating: number;
  setSelectedRating: (value: number) => void;
  searchMovies: (options: SearchOptions) => Promise<void>;
  currentPage: number,
  setCurrentPage: (page: number) => void;
  totalResults: number;
  favorites: Movie[];
  setFavorites: (movies: Movie[]) => void;
};

interface SearchOptions {
  query: string,
  genre?: string,
  year?: string,
  page?: number;
  type?: string;
};

interface RawMovieItem {
  imdbID?: string;
  id?: string;
  _id?: string;
  Title?: string;
  title?: string;
  Year?: string;
  year?: string;
  Type?: string;
  type?: string;
  Poster?: string | null; 
  poster?: string | null; 
  imdbRating?: string;
  rating?: string;
  Rating?: string;
  Rated?: string;
  rated?: string;
}

const MovieContext = createContext<MovieContextData>({} as MovieContextData);

export const MovieProvider = ({ children }: { children: ReactNode }) => {

  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('@PrimeSearch:searchTerm') || '');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedType, setSelectedType] = useState<'' | 'movie' | 'series'>('');
  const [selectedRating, setSelectedRating] = useState<number>(0);


  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const storedFavorites = localStorage.getItem('@PrimeMovies:favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const debouncedTerm = useDebounce(searchTerm, 500);

  const fetchMovies = useCallback(async ({ query, genre = '', year = '', page = 1, type }: SearchOptions) => {
    if (!query.trim() && !genre && !year) {
      setMovies([]);
      setTotalResults(0);
      return;
    };

    setLoading(true);
    setError(null);
    try {
      const response = await movieService.searchMovies({ query, genre, year, page, type })

      if (response && Array.isArray(response.movies)) {
        const mappedMovies: Movie[] = response.movies.map((item: RawMovieItem) => ({
          id: item.imdbID || item.id || item._id,
          imdbID: item.imdbID || item.id || '',
          Title: item.Title || item.title || 'Sem título',
          Year: item.Year || item.year || 'N/A',
          Type: item.Type || item.type || 'movie',
          Poster: item.Poster || item.poster || null,
          imdbRating: item.imdbRating || item.rating || 'N/A',
          Rating: item.Rating || item.rating || 'N/A',
          Rated: item.Rated || item.rated || 'N/A',
        } as Movie));

        setMovies(mappedMovies);
        const total = Number(response.totalResults || response.totalResults || 0);
        setTotalResults(total);
      } else {
        setMovies([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error("Erro in process...:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [])

  const updateFavorites = useCallback((newOrder: Movie[]) => {
    setFavorites(newOrder);
    localStorage.setItem('@PrimeMovies:favorites', JSON.stringify(newOrder));
  }, []);

  useEffect(() => {
    const term = debouncedTerm.trim();

    if (term) {
      fetchMovies({ query: debouncedTerm, genre: selectedGenre !== "" ? selectedGenre : undefined, year: selectedYear !== "" ? selectedYear : undefined, page: currentPage, type: selectedType || undefined });
      localStorage.setItem('@PrimeSearch:searchTerm', debouncedTerm);
    }
  }, [debouncedTerm, selectedGenre, selectedYear, currentPage, selectedType, fetchMovies]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedTerm, selectedGenre, selectedYear, selectedType])

  const value = useMemo(() => ({
    searchTerm, setSearchTerm, movies, setMovies, loading, error, searchMovies: fetchMovies, selectedGenre, setSelectedGenre, selectedYear, setSelectedYear, selectedType, setSelectedType, selectedRating, setSelectedRating, favorites, setFavorites: updateFavorites, currentPage, setCurrentPage, totalResults
  }), [searchTerm, movies, loading, error, fetchMovies, selectedGenre,
    selectedYear, selectedType, selectedRating, favorites,
    updateFavorites, currentPage, totalResults]);

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext };