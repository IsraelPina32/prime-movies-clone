import { MovieCard } from "../../components/movies/MovieCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Film, HeartOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "../../hooks/useFavorites";

export function FavoritesPage() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#0f171e] pt-24 pb-12 px-4 md:px-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="relative flex flex-col items-center justify-center mb-10 border-b border-white/10 pb-6 min-h-[60px]">
          <button 
            onClick={() => navigate(-1)} 
            className="md:absolute left-0 top-1/2 md:-translate-y-1/2 self-start mb-6 md:mb-0 flex items-center gap-2 text-gray-400 hover:text-prime-blue transition-colors font-semibold group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          
          <div className="flex flex-col gap-4 leading-none">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight text-center">
              Meus Favoritos.
            </h1>
            {favorites.length > 0 && (
              <span className=" bg-prime-blue/20 text-prime-blue py-2 px-4 rounded-full text-base font-bold border border-prime-blue/30 shadow-lg h-fit self-center min-w-[1.75rem]">
                {favorites.length}
              </span>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {favorites.length === 0 ? (
            <motion.div 
              key="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-32 px-4 text-center bg-[#1a242f]/50 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-sm mt-10"
            >
              <div className="relative mb-6">
                <Film size={64} className="text-gray-700" />
                <HeartOff size={32} className="absolute -bottom-2 -right-2 text-prime-blue drop-shadow-md" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Nenhum filme salvo</h2>
              <p className="text-gray-400 max-w-md mb-8">
                Sua galeria pessoal está vazia. Navegue pelo catálogo e clique no coração para criar sua lista de obras-primas.
              </p>
              <button 
                onClick={() => navigate('/')}
                className="bg-prime-blue hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] active:scale-95"
              >
                Explorar Catálogo
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="grid-container"
              layout 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6"
            >
              <AnimatePresence>
                {favorites.map((movie) => (
                  <motion.div
                    key={movie.imdbID}
                    layout 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.5, 
                      filter: "blur(10px)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    <MovieCard movie={movie} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </main>
  );
}