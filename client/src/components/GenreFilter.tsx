import { useMovieContext } from "../context/MovieContext";

const GENRES = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Triller"];

export const GenreFilter = () => {
    const { selectedGenre, setSelectedGenre } = useMovieContext();

    return (
        <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="h-11 px-3 rounded-2xl bg-white/[0.08] text-white 
                 border border-white/20 outline-none transition-all 
                 focus:bg-white/[0.15] focus:border-slate-500/50
                 cursor-pointer backdrop-blur-xl shadow-lg"
        >
            <option value="" className="bg-[#1a242f]"> Todos os Gẽneros</option>
            {GENRES.map( genre => (
                <option key={genre} value={genre} className="bg-[#1a242f] text-white">{genre}</option>
            ))}
        </select>
    )
}