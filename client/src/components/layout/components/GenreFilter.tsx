import { useMovieContext } from "../../../context/MovieContext";

const GENRES = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Thriller", "Adventure", "Animation", "Biography", "Crime", "Documentary", "Family", "Fantasy", "History", "Music", "Mystery", "Romance", "Sport", "War", "Western"];

export const GenreFilter = () => {
    const { selectedGenre, setSelectedGenre, setCurrentPage } = useMovieContext();

    const handleGenreChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGenre(e.target.value);
        setCurrentPage(1);
    }

    return (
        <div className="flex flex-col relative group">
          <label 
                className={`
                    mt-1 w-full text-center text-[10px] font-bold uppercase tracking-widest transition-all duration-300
                    ${selectedGenre ? 'opacity-100 translate-y-0 text-slate-400' : 'opacity-0 -translate-y-1 text-gray-400'}
                    group-focus-within:opacity-100 group-focus-within:translate-y-0
                `}
            >
                Gênero
            </label>
          <select
            value={selectedGenre}
            onChange={handleGenreChange}
            className="h-11 px-3 rounded-2xl bg-white/[0.08] text-white 
                 border border-white/20 outline-none transition-all 
                 focus:bg-white/[0.15] focus:border-slate-500/50
                 cursor-pointer backdrop-blur-xl shadow-lg"
            >
            <option value="" className="bg-[#1a242f]"> Todos os Gêneros</option>
            {GENRES.map( genre => (
                <option key={genre} value={genre} className="bg-[#1a242f] text-white">{genre}</option>
            ))}
          </select>
        </div> 
    )
};