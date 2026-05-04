import { useMovieContext } from "../context/MovieContext";
import { Pagination } from "../components/Pagination";
import { useEffect } from "react";
import { MovieList } from "../components/movies/MovieList";
import { useMemo } from "react";

export const Home = () => {
  const { movies, setMovies, searchTerm, searchMovies, selectedGenre, selectedYear, currentPage, setCurrentPage, favorites, setFavorites, totalResults, loading, selectedRating } = useMovieContext();

  useEffect(() => {
    if (searchTerm) {
      searchMovies({ query: searchTerm, genre: selectedGenre, year: selectedYear, page: currentPage })
    }
  }, [currentPage, searchTerm, selectedGenre, selectedYear, searchMovies])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredMovies = useMemo(() => {
    if (!selectedRating || selectedRating === 0) return movies;

    return movies.filter((movie) => {
      if (!movie.imdbRating || movie.imdbRating === 'N/A') return false;
      return parseFloat(movie.imdbRating) >= selectedRating;
    });
  }, [movies, selectedRating]);

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
            {filteredMovies.length > 0 ? (
              <MovieList movies={filteredMovies} onReorder={setMovies} />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 bg-white/5 rounded-2xl border border-dashed border-white/10">
                <div className="text-5xl opacity-50">D:</div>
                <h3 className="text-xl font-bold text-white">
                  Nenhum filme com nota ≥ {selectedRating} nesta página
                </h3>
                <p className="text-gray-400 max-w-md px-6">
                  Os filmes carregados para esta página não atingiram sua exigência.
                  Tente navegar para a próxima página ou ajustar o filtro.
                </p>
              </div>
            )}

            <div className="mt-8 border-t border-white/5 pt-8">
              <Pagination
                currentPage={currentPage}
                totalResults={totalResults}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          searchTerm && !loading && (
            <div className="text-center py-20 text-gray-500">
              Nenhum resultado encontrado para "{searchTerm}".
            </div>
          )
        )}
      </section>
    </main>
  );
};
