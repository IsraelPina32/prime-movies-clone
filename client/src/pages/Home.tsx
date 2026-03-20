import { useMovieContext } from "../context/MovieContext";
import { Pagination } from "../components/Pagination";
import { useEffect } from "react";
import { FilteredMovieGrid } from "../components/layout/components/FilteredMovieGrid";

export const Home = () => {
    const { movies, searchTerm, searchMovies, selectedGenre, selectedYear, currentPage, setCurrentPage, totalResults } = useMovieContext();

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

      <FilteredMovieGrid/>
   
      { movies.length > 0 ? (
                <Pagination 
                currentPage={currentPage} totalResults={totalResults} onPageChange={handlePageChange}
                />
      ): (
          <div className="text-zinc-500 text-center py-10">
              Nenhum filme encontrado para os filtros selecionados.
    </div>
      )}
    </main>
    );
};
