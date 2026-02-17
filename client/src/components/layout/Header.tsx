import { Link } from 'react-router-dom';
import { useMovieContext } from '../../context/MovieContext';
import { FilterBar } from './components/FilterBar';

export const Header =  () => {
  const { searchTerm, setSearchTerm} = useMovieContext();
  return (
    <header className="w-full bg-[#1a242f]/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 rounded-lg mb-6 shadow-2xl">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between flex-col min-[426px]:flex-row gap-4 min-[426px]:gap-0 px-10 py-4">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-[20px] font-extrabold text-slate-100 tracking-tight cursor-pointer">
            Prime Video <span className="text-prime-blue">Search</span>
          </h1>
        </Link>

          <FilterBar/>
        <div className="w-full min-[426px]:w-[40%] max-w-[300px] relative">
          <div className='relative w-full max-w-[300px]'>
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
        </div>
        </div>
      </div>
    </header>
  );
};