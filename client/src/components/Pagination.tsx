interface PaginationProps {
    currentPage: number;
    totalResults: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalResults, onPageChange }: PaginationProps) => {
    const moviesPerPage = 10;
    const total = Number(totalResults) || 0;
    const totalPages = Math.ceil(total / moviesPerPage) || 1;

    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
        const maxVisible = 5;
        const pages: number[] = [];
        
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + maxVisible - 1);
        
        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const visiblePages = getVisiblePages();
    const baseBtnStyles = "flex items-center justify-center transition-all duration-300 font-medium rounded-lg disabled:opacity-30 disabled:cursor-not-allowed";
    const navBtnStyles = `${baseBtnStyles} px-5 py-2 bg-[#1a242f] text-white hover:bg-blue-900 active:scale-95 text-sm sm:text-base`;
    const pageBtnStyles = `${baseBtnStyles} w-10 h-10 text-sm`;
    const activePageStyles = "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 scale-105 pointer-events-none";
    const inactivePageStyles = "bg-[#141a22] text-gray-400 hover:bg-[#1a242f] hover:text-white border border-gray-800 active:scale-95";

    return (
        <nav className="flex items-center justify-center gap-3 mt-12 mb-8 animate-fade-in select-none" aria-label="Navegação de páginas">
            <button 
                disabled={currentPage === 1} 
                onClick={() => onPageChange(currentPage - 1)}
                className={navBtnStyles}
                aria-label="Página Anterior"
            >
                Anterior
            </button>

            <div className="hidden sm:flex items-center gap-2">
                {visiblePages[0] > 1 && (
                    <>
                        <button onClick={() => onPageChange(1)} className={`${pageBtnStyles} ${inactivePageStyles}`}>1</button>
                        {visiblePages[0] > 2 && <span className="text-gray-600 px-1 tracking-widest">...</span>}
                    </>
                )}

                {visiblePages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        aria-current={currentPage === page ? "page" : undefined}
                        className={`${pageBtnStyles} ${currentPage === page ? activePageStyles : inactivePageStyles}`}
                    >
                        {page}
                    </button>
                ))}

                {visiblePages[visiblePages.length - 1] < totalPages && (
                    <>
                        {visiblePages[visiblePages.length - 1] < totalPages - 1 && <span className="text-gray-600 px-1 tracking-widest">...</span>}
                        <button onClick={() => onPageChange(totalPages)} className={`${pageBtnStyles} ${inactivePageStyles}`}>{totalPages}</button>
                    </>
                )}
            </div>

            <button 
                disabled={currentPage === totalPages} 
                onClick={() => onPageChange(currentPage + 1)}
                className={navBtnStyles}
                aria-label="Próxima Página"
            >
                Próxima
            </button>
        </nav>
    );
};