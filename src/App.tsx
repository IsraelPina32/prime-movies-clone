import {  useEffect, useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useDebounce } from "./hooks/useDebounce";
import { MovieSkeleton } from "./components/movies/MovieSkeleton";

function App() {
   const [searchTerm,  setSearchTerm] = useState('Batman');
   const { movies, loading, error, searchMovies } = useMovies();

   const debouncedTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
     if(debouncedTerm) {
        searchMovies(debouncedTerm);
     }
  }, [debouncedTerm]);

  if(loading) return  <h1> Carregando filmes... (Verifique o Console)</h1>

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
        {loading && <p className="col-span-full text-center animate-pulse">Carregando catálogo...</p>}
        {loading && Array.from({ length: 10 }).map((_, index) => (
    <MovieSkeleton key={`skeleton-${index}`} />
  ))}

  {error && !loading && (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-xl font-medium mb-2 text-red-700">Nenhum resultado encontrado</p>
        <span className="text-sm opacity-60">Tente buscar por outro título</span>
    </div>
      )}
        {movies.map(movie => (
        <article key={movie.imdbID} className="relative group bg-[#1a242f] rounded-lg overflow-hidden isolate transition-all duration-300 hover:scale-105 shadow-2xl transform-gpu">
          <div className="aspect-[2/3] w-full overflow-hidden">
            <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=Sem+Poster'} 
              alt={movie.Title} 
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"/>
          </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f171e] via-transparent to-transparent 
                      opacity-100 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none"/>
          <div className="absolute bottom-0 left-0 right-0 p-3 text-center z-10 pointer-events-none">
              <h3 className="text-[10px] md:text-xs text-gray-100 font-bold truncate leading-tight line-clamp-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{movie.Title}</h3>
              <p className="text-[10px] text-xs font-black text-prime-blue mt-1 tracking-wide uppercase">{movie.Year}</p>
          </div>
        </article>
        ))}
      </main>
    </div>
  );
}

export default App
