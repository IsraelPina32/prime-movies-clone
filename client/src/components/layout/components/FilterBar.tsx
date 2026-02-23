import { GenreFilter } from "./GenreFilter"
import TypeFilter  from "./TypeFilter"
import { YearFilter } from "./YearFilter"

export const FilterBar = () => {
    return (
        <div className="flex gap-4 p-4 bg-black/20 backdrop-blur-sm rounded-lg items-center">
            <YearFilter/>
            <TypeFilter/>
            <GenreFilter/>
        </div>
    )
}