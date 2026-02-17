import { useMovieContext } from "../../../context/MovieContext";

export const YearFilter = () => {
    const { selectedYear, setSelectedYear } = useMovieContext();

    const years = Array.from({ length: 2026 - 1970 + 1}, (_, i) => 2026 - i);

    return (
        <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-zinc-800 text-white border border-zinc-700 rounded-md px-2 py-1 outline-none focus:border-blue-500 transition-colors cursor-pointer"
        >
            <option value="">Todos os anos</option>
            {years.map((year) => (
                <option key={year} value={year.toString()}>
                    {year}
                </option>
            ))}
        </select>
    )
}