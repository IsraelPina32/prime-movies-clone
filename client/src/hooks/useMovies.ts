import { useState, useCallback} from "react";
import { movieService } from "../services/movieService";
import type { Movie } from "../types/movie";

/**
 * Hook to manage movie search state, loading indicators, and API integration.
 */

export const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState< string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalResults, setTotalResults] = useState<number>(0);

    const searchMovies = useCallback( async (query: string  = '', genre: string = '', year: string = '', page: number = 1) => {
        if(!query.trim()) {
            setMovies([]);
            setTotalResults(0);
            setError(null);
            return;
        };

        try {
            setLoading(true);
            setError(null);
            const data = await movieService.searchMovies(query, genre, year, page);

            if (data && data.Response === "True" && data.Search) {
                setMovies(data.Search);
                setTotalResults(Number(data.totalResults) || 0);
            } else {
                setError(" Unknown result from movie serice");
                setMovies([]);
            setTotalResults(0);
            }
        } catch (err) {
            setError('Error in connection to movie service');
            setMovies([]);
            setTotalResults(0);
        } finally {
            setLoading(false);
        }
    }, []);
    return { searchTerm, setSearchTerm, movies, loading, error, searchMovies, totalResults}
};