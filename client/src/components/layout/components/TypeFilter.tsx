import { useMovieContext } from "../../../context/MovieContext";

const TypeFilter = () => {

    const { setSelectedType, selectedType, setCurrentPage } = useMovieContext();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value as '' | 'movie' | 'series';
        setSelectedType(newType);
        setCurrentPage(1);
    };

    return (
        <div className=" flex flex-col gap-1 relative group w-full mazx-w-[150px]">

              <label htmlFor="type-filter" className={`
                    mt-2  text-[10px] text-gray-400 font-bold uppercase tracking-widest transition-all text-center duration-300
                    ${selectedType ? 'opacity-100 translate-y-0 text-slate-400' : 'opacity-0 -translate-y-1'}
                    group-focus-within:opacity-100 group-focus-within:translate-y-0  text-center
                `}>
                Conteúdo
            </label>
           
            <select id="type-filter" value={selectedType} onChange={handleChange} 
                className="h-11 px-2 rounded-xl bg-white/[0.08] text-white 
                           border border-white/20 outline-none transition-all 
                           focus:bg-white/[0.12] focus:border-slate-600/50
                           cursor-pointer backdrop-blur-xl shadow-lg text-sm">
                <option value="" className="bg-[#1a242f] text-white">Todos</option>
                <option value="movie" className="bg-[#1a242f] text-white">FIlmes</option>
                <option value="series" className="bg-[#1a242f] text-white">Séries</option>
            </select>
        </div>
    );
};

export default TypeFilter;