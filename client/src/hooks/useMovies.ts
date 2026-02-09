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

    const searchMovies = useCallback( async (query: string) => {
        if(!query.trim()) {
            setMovies([]);
            setError(null);
            return;
        };

        try {
            setLoading(true);
            setError(null);
            const data = await movieService.searchMovies(query);

            if (data && data.length > 0) {
                setMovies(data);
            } else {
                setError(" Unknown result from movie serice");
                setMovies([]);
            }
        } catch (err) {
            setError('Error in connection to movie service');
            setMovies([]);
        } finally {
            setLoading(false);
        }
    }, []);
    return { searchTerm, setSearchTerm, movies, loading, error, searchMovies}
};