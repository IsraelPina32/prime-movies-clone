import { useState, useCallback} from "react";
import { movieService } from "../services/movieService";
import type { Movie } from "../types/movie";

/**
 * Hook to manage movie search state and logic.
 */

export const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);
    const [error, setError] = useState< string | null>(null);

    const searchMovies = useCallback( async (query: string) => {
        if(!query.trim()) {
            setMovies([]);
            setError(null);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await movieService.searchMovies(query);

            if (data.Response === "True" && data.Search) {
                setMovies(data.Search);
            } else {
                setError(data.Error || " Unknown result from movie serice");
                setMovies([]);
            }
        } catch (err) {
            setError('Error in connection to movie service');
            setMovies([]);
        } finally {
            setLoading(false);
        }
    }, []);
    return { movies, loading, error, searchMovies}
};