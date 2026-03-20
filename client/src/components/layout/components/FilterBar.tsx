import { GenreFilter } from "./GenreFilter"
import { RatingFilter } from "./RatingFilter"
import TypeFilter  from "./TypeFilter"
import { YearFilter } from "./YearFilter"

export const FilterBar = () => {
    return (
        <div className="flex items-end gap-6 p-5 bg-black/20 backdrop-blur-sm rounded-xl h-24">
            <YearFilter/>
            <TypeFilter/>
            <GenreFilter/>
            <RatingFilter/>
        </div>
    )
}