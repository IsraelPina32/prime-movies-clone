interface PaginationProps {
    currentPage: number;
    totalResults: number;
    onPageChange: (page: number) => void;
}


export const Pagination = ({currentPage, onPageChange, totalResults }: PaginationProps) => {
    
    console.log("DEBUG PAGINAÇÃO", {totalResults, type: typeof totalResults});
    
    const moviesPerpage = 10;
    const total = Number(totalResults) || 0;
    const totalPages = Math.ceil(total / moviesPerpage) || 1;

    if(totalPages <= 1) return null;

    const buttonStyles = "px-6 py-2 rounded-full font-medium transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed";
    const activeStyles = "bg-[#1a242f] text-yellow-500  text-white hover:bg-blue-900 hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20";
    return (
        <nav  className="flex items-center justify-center gap-8 mt-12 mb-8 animate-fade-in">
            <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}
            className={`${buttonStyles} ${currentPage !== 1 ? activeStyles : 'bg-gray-800 text-gray-500'}`}>
                Anterior
            </button>
            <div className="flex items-center gap-2">
            <span className="text-gray-500">{currentPage} / {totalPages}</span>
            </div>
            <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}
                className={`${buttonStyles} ${currentPage !== totalPages ? activeStyles : 'bg-gray-800 text-gray-500'}`}
            >
                Próxima
            </button>
        </nav>
    )
};