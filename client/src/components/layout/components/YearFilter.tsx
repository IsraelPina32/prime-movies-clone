import { useMovieContext } from "../../../context/MovieContext";

export const YearFilter = () => {
    const { selectedYear, setSelectedYear, setCurrentPage } = useMovieContext();

    const years = Array.from({ length: 2026 - 1970 + 1}, (_, i) => 2026 - i);

    return (
        <div className="flex flex-col relative group">
        <label className={`
                    mt-1 w-full text-center text-[10px] font-bold uppercase tracking-widest transition-all duration-300
                    ${selectedYear ? 'opacity-100 translate-y-0 text-slate-400' : 'opacity-0 -translate-y-1 text-gray-400'}
                    group-focus-within:opacity-100 group-focus-within:translate-y-0
                `}>
                Lançamento
            </label>
        <select
            value={selectedYear}
            onChange={(e) => {setSelectedYear(e.target.value)
                setCurrentPage(1);
            }}
            
            className="h-11 px-3 min-w-[120px] rounded-2xl bg-white/[0.08] text-white 
               border border-white/20 outline-none transition-all 
               focus:bg-white/[0.12] focus:border-slate-500/50
               cursor-pointer backdrop-blur-xl shadow-lg text-sm text-center"
        >
            <option value="" className="bg-[#1a242f] text-zinc-400">Todos os anos</option>
            {years.map((year) => (
                <option key={year} className="bg-[#1a242f] text-white" value={year.toString()}>
                    {year}
                </option>
            ))}
        </select>
       </div> 
    )
};