import { useState, useCallback } from "react";
import { movieService } from "../services/movieService";
import type { Movie } from "../types/movie";

/**
 * Hook to manage movie search state, loading indicators, and API integration.
 */

interface SearchOptions {
  query: string;
  genre?: string;
  year?: string;
  page?: number;
  type?: string;
}

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

export const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalResults, setTotalResults] = useState<number>(0);

    const searchMovies = useCallback(async ({query = '', genre = '', year = '', page = 1}: SearchOptions): Promise<void> => {
        if (!query.trim()) {
            setMovies([]);
            setTotalResults(0);
            setError(null);
            return;
        };

        try {
            setLoading(true);
            setError(null);
            const response = await movieService.searchMovies({ query, genre, year, page });

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
                setTotalResults(Number(response.totalResults || 0));
            } else {
                setError(" Unknown result from movie serice");
                setMovies([]);
                setTotalResults(0);
            }
        } catch  {
            setError('Error in connection to movie service');
            setMovies([]);
            setTotalResults(0);
        } finally {
            setLoading(false);
        }
    }, []);
    return { searchTerm, setSearchTerm, movies, loading, error, searchMovies, totalResults }
};