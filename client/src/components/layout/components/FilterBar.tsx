import { GenreFilter } from "./GenreFilter"
import { YearFilter } from "./YearFilter"

export const FilterBar = () => {
    return (
        <div className="flex gap-4 p-4 bg-black/20 backdrop-blur-sm rounded-lg items-center">
            <GenreFilter/>
            <YearFilter/>
        </div>
    )
}