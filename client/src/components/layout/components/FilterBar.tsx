import { GenreFilter } from "./GenreFilter"
import TypeFilter  from "./TypeFilter"
import { YearFilter } from "./YearFilter"

export const FilterBar = () => {
    return (
        <div className="flex items-end gap-6 p-5 bg-black/20 backdrop-blur-sm rounded-xl">
            <YearFilter/>
            <TypeFilter/>
            <GenreFilter/>
        </div>
    )
}