import { useMovieContext } from "../../../context/MovieContext";


export const RatingFilter = () => {
    const { selectedRating, setSelectedRating, setCurrentPage} = useMovieContext();

    const ratings = Array.from({ length: 10}, (_, i) => (9 - i).toString());

    return (
        <div className="flex flex-col h-16 justify-end relative group">
            <label className={`
                mb-1 w-full text-center text-[10px] font-bold uppercase tracking-widest transition-all duration-300
                ${selectedRating ? 'opacity-100 translate-y-0 text-yellow-500' : 'opacity-0 -translate-y-1 text-gray-400'}
                group-focus-within:opacity-100 group-focus-within:translate-y-0
            `}>
                Rating Mínimo
            </label>
            <select
                value={selectedRating}
                onChange={(e) => {
                    setSelectedRating(Number(e.target.value));
                    setCurrentPage(1);
                }}
                className="h-11 px-4 rounded-2xl bg-white/[0.08] text-white 
                           border border-white/20 outline-none transition-all 
                           focus:bg-white/[0.12] focus:border-yellow-500/50
                           cursor-pointer backdrop-blur-xl shadow-lg text-sm text-center"
            >
                <option value="" className="bg-[#1a242f] text-zinc-400">Avaliação: Todas</option>
                {ratings.map((rate) => (
                    <option key={rate} value={rate} className="bg-[#1a242f] text-white">
                        {rate}+ ⭐
                    </option>
                ))}
            </select>
        </div>
    );
};