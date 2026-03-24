import { GenreFilter } from "./GenreFilter"
import { RatingFilter } from "./RatingFilter"
import TypeFilter  from "./TypeFilter"
import { YearFilter } from "./YearFilter"

export const FilterBar = ({ isSidebar }: {isSidebar?: boolean}) => {
    return (
        <div className={`flex ${isSidebar ? "flex-col gap-8": 'flex-row gap-4'}`}>
            <YearFilter/>
            <TypeFilter/>
            <GenreFilter/>
            <RatingFilter/>
        </div>
    )
}