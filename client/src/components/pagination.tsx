export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: Function;
}) => {
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };
    return (
        <div className="flex items-center justify-center border-t border-gray-700 px-4 sm:px-0 mt-4">
            <div className="flex md:-mt-px md:flex">
                {[...Array(totalPages)].map((_, index) => {
                    const page = index+1;
                    return (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                                currentPage === page
                                    ? "border-indigo-500 text-indigo-600"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            }`}
                            aria-current={
                                currentPage === page ? "page" : undefined
                            }
                            disabled={currentPage === page}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};