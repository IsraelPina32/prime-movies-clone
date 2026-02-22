import { MovieGridSkeleton } from "../components/movies/MovieGridSkeleton";
import { ErrorState } from "../components/ui/ErrorState";
import { MovieCard } from "../components/movies/MovieCard"
import { useMovieContext } from "../context/MovieContext";
import { Pagination } from "../components/Pagination";
import { useEffect } from "react";

export const Home = () => {
    const { movies, loading, error, searchTerm, searchMovies, selectedGenre, selectedYear, currentPage, setCurrentPage, totalResults } = useMovieContext();

    useEffect(() => {
      if(searchTerm) {
        searchMovies({query: searchTerm, genre: selectedGenre, year: selectedYear, page: currentPage})
      }
    }, [currentPage, searchTerm, selectedGenre, selectedYear, searchMovies])

    const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth'})
    }
    return (
    <main className="max-w-[1440px] mx-auto px-10 py-6">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-3 pt-4">
        {loading && <MovieGridSkeleton count={10} isLoading/>}
       {!loading && error && (
        <div className="col-span-full py-20">
          <ErrorState message={error} onRetry={() => searchMovies({ query: searchTerm})}/>
        </div>
        )}
        {!loading && !error && (movies || []).map((movie => (
          <MovieCard  key={movie.id} movie={movie}/>
        )))
        }
        {!loading && !error && searchTerm && movies.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-400">
            <p className="text-xl">Nenhum filme encontrado para "<span className="text-white">{searchTerm}</span>"</p>
            <p className="text-sm mt-2">Tente digitar o nome de outro filme.</p>
          </div>
        )}
        {!loading && !error && !searchTerm && (
          <div className="col-span-full text-center py-20 text-gray-500">
            <p className="text-2xl font-light italic">Pesquise por seus filmes favoritos acima...</p>
          </div>
        )}
      </div>
        <Pagination currentPage={currentPage} totalResults={totalResults} onPageChange={handlePageChange}/>
    </main>
    );
};