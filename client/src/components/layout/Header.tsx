import { Link } from 'react-router-dom';
import { useMovieContext } from '../../context/MovieContext';
import { useState } from 'react';
import { FilterSidebar } from './FiltererSidebar';
import { Menu, Search, Heart} from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';

export const Header =  () => {
  const { searchTerm, setSearchTerm} = useMovieContext();
  const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);
  const { favorites} = useFavorites();
  return (
    <>
    <header className="w-full bg-[#1a242f]/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 mb-6 shadow-2xl">

      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-4">
        <div className="flex flex-col lg:flex-row w-full items-center justify-between gap-4">

        <Link to="/" className="hover:opacity-80 transition-opacity shrink-0">
          <h1 className="text-[20px] font-extrabold text-slate-100 tracking-tight cursor-pointer">
            Movies Prime <span className="text-prime-blue">Pro</span>
          </h1>
        </Link>

        

         <div className="flex-1 max-w-[500px] relative mx-2">
          <input
            type="text"
            placeholder="Pesquisar filmes..."
            aria-label="Pesquisar filmes"
            className="w-full h-11 pl-3 pr-6 rounded-2xl
                     bg-white/[0.08] backdrop-blur-xl 
                     border border-white/20 border-b-white/10 border-r-white/10
                     text-white placeholder-white/40
                     outline-none transition-all duration-500
                     focus:bg-white/[0.15] focus:border-slate-500/50
                     focus:ring-4 focus:ring-prime-blue/10
                     shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5"/>
        </div>
        <div className="flex items-center gap-3">
              {/* Link Favoritos com Badge */}
              <Link 
                to="/favorites" 
                className="relative flex items-center justify-center p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-gray-300 hover:text-red-500 hover:bg-white/[0.1] transition-all group"
                title="Meus Favoritos"
              >
                <Heart size={20} className={favorites.length > 0 ? "fill-red-500 text-red-500" : ""} />
                
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-prime-blue text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg border border-[#1a242f]">
                    {favorites.length}
                  </span>
                )}
              </Link>
    
        <button 
        onClick={() => setIsFilterBarOpen(true)} className="flex items-center gap-2 bg-prime-blue/10 hover:bg-prime-blue/20 text-prime-blue px-4 py-2 rounded-xl border border-prime-blue/20 transition-all font-semibold">
          <Menu size={18}/>
          <span className='hidden sm:inline'>Filtros</span>
          </button>
            </div>
        </div>
      </div>
   </header>
      <FilterSidebar isOpen={isFilterBarOpen} onClose={() => setIsFilterBarOpen(false)}/>
    </>
   );
};