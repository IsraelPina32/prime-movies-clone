import { useMovieContext } from "../context/MovieContext";
import { Pagination } from "../components/Pagination";
import { useEffect } from "react";
import { MovieList } from "../components/movies/MovieList";

export const Home = () => {
  const { movies, setMovies, searchTerm, searchMovies, selectedGenre, selectedYear, currentPage, setCurrentPage, favorites, setFavorites, totalResults, loading } = useMovieContext();

  useEffect(() => {
    if (searchTerm) {
      searchMovies({ query: searchTerm, genre: selectedGenre, year: selectedYear, page: currentPage })
    }
  }, [currentPage, searchTerm, selectedGenre, selectedYear, searchMovies])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="max-w-[1440px] mx-auto px-10 py-6 space-y-12">
      {favorites.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Meus Favoritos</h2>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
            <MovieList movies={favorites} onReorder={setFavorites} />
          </div>
        </section>
      )}

      <section>
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
          </div>
        ) : movies.length > 0 ? (
          <>
            <MovieList movies={movies} onReorder={setMovies} />
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalResults={totalResults}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="text-zinc-500 text-center py-10">
            Nenhum filme encontrado para os filtros selecionados.
          </div>
        )}
      </section>
    </main>
  );
};
