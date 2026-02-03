import {  useEffect, useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useDebounce } from "./hooks/useDebounce";
import { MovieGridSkeleton } from "./components/movies/MovieGridSkeleton";
import { ErrorState } from "./components/ui/ErrorState";
import { MovieCard } from "./components/movies/MovieCard";
function App() {
   const [searchTerm,  setSearchTerm] = useState('Batman');
   const { movies, loading, error, searchMovies } = useMovies();
   const debouncedTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
     if(debouncedTerm) {
        searchMovies(debouncedTerm);
     }
  }, [debouncedTerm]);

  return (
    
    <div className="min-h-screen bg-prime-bg text-white p-8">
      <header className="w-full bg-[#1a242f]/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 rounded-lg mb-6 shadow-2xl">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between flex-col min-[426px]:flex-row gap-4 min-[426px]:gap-0 px-10 py-4">
          <h1 className="text-[20px] font-extrabold text-slate-100 tracking-tight cursor-pointer">Prime Video Search</h1>
      <input  
        type="text" 
        placeholder="Pesquisar..."
        className="w-full min-[426px]:w-[40%] max-w-[300px] h-11 pl-3 pr-6 rounded-2xl
             /* Base Glass */
             bg-white/[0.08] backdrop-blur-xl 
             /* Bordas de Luz (Estilo Apple) */
             border border-white/20 border-b-white/10 border-r-white/10
             /* Texto e Placeholder */
             text-white placeholder-white/40
             /* Efeitos de Interação */
             outline-none transition-all duration-500
             focus:bg-white/[0.15] focus:border-slate-500/50
             focus:ring-4 focus:ring-prime-blue/10
             /* Sombra para flutuação */
             shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
      </header>

      <main className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-3 pt-4">
        <MovieGridSkeleton isLoading={!!loading} count={16} />
       {!loading && error && searchTerm && (
         <ErrorState message={error} onRetry={() => searchMovies(searchTerm)}/>
        )}
        {!loading && !error && movies.map((movie => (
          <MovieCard  key={movie.imdbID} movie={movie} />
        )))}
      </main>
    </div>
  );
}

export default App
