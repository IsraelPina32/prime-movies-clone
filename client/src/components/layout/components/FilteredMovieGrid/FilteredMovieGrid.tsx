import { useMemo } from "react";
import { useMovieContext } from "../../../../context/MovieContext";
import { MovieCard } from "../../../movies/MovieCard";
import { MovieGridSkeleton } from "../../../movies/MovieGridSkeleton";
import { ErrorState } from "../../../ui/ErrorState";

export const FilteredMovieGrid = () => {
    const { movies, selectedRating, loading, error, searchTerm, searchMovies} = useMovieContext();
    

    const filteredMovies = useMemo(() => {
        if(!movies) return [];
        if (selectedRating === 0) return movies;
   
        return movies.filter(movie => {
            const movieRate = parseFloat(movie.imdbRating || "0");
            return movieRate >= selectedRating;
        });
    }, [movies, selectedRating]);

    if(loading) {
        return <MovieGridSkeleton count={10} isLoading />
    }

    if (error) {
        return (
            <div className="col-span-full py-20">
                <ErrorState message={error} onRetry={() => searchMovies({ query: searchTerm})}/>
            </div>
        );
    }

    if(!loading && movies.length > 0 && filteredMovies.length
        === 0
     ) {
        return (
            <div className="flex justify-center items-center h-64 w-full">
                <p className="text-zinc-500 text-lg">
                    Nenhum filme com avaliação {selectedRating}+ encontrado nesta página.
                </p>
            </div>
        );
     }

     return (
        <section className="mt-8 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredMovies.map((movie) => (
                    <MovieCard key={movie.imdbID || movie.id} movie={movie} />
                ))}
            </div>
        </section>
     );
};