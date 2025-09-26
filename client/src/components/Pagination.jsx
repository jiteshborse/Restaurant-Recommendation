import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRestaurants } from '../hooks/useRestaurants';

const Pagination = () => {
    const { pagination, setPage, loading } = useRestaurants();

    const {
        currentPage,
        totalPages,
        totalCount,
        limit,
        hasNext,
        hasPrev
    } = pagination;

    // Don't show pagination if there's only one page or no results
    if (totalPages <= 1) return null;

    // Generate page numbers for pagination UI
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Smart pagination with ellipsis
            const halfVisible = Math.floor(maxVisiblePages / 2);
            let startPage = Math.max(1, currentPage - halfVisible);
            let endPage = Math.min(totalPages, currentPage + halfVisible);

            // Adjust if we're near the beginning or end
            if (currentPage <= halfVisible) {
                endPage = Math.min(totalPages, maxVisiblePages);
            } else if (currentPage >= totalPages - halfVisible) {
                startPage = Math.max(1, totalPages - maxVisiblePages + 1);
            }

            // Add first page and ellipsis if needed
            if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) {
                    pages.push('...');
                }
            }

            // Add visible pages
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            // Add ellipsis and last page if needed
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pages.push('...');
                }
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const handlePageClick = (page) => {
        if (page !== currentPage && !loading) {
            setPage(page);
            // Scroll to top when page changes
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrevious = () => {
        if (hasPrev && !loading) {
            handlePageClick(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (hasNext && !loading) {
            handlePageClick(currentPage + 1);
        }
    };

    const pageNumbers = getPageNumbers();
    const resultStart = (currentPage - 1) * limit + 1;
    const resultEnd = Math.min(currentPage * limit, totalCount);

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-8">
            {/* Mobile pagination */}
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={handlePrevious}
                    disabled={!hasPrev || loading}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Previous
                </button>

                <div className="flex items-center">
                    <span className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                </div>

                <button
                    onClick={handleNext}
                    disabled={!hasNext || loading}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                </button>
            </div>

            {/* Desktop pagination */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing{' '}
                        <span className="font-medium">{resultStart}</span> to{' '}
                        <span className="font-medium">{resultEnd}</span> of{' '}
                        <span className="font-medium">{totalCount}</span> results
                    </p>
                </div>

                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        {/* Previous button */}
                        <button
                            onClick={handlePrevious}
                            disabled={!hasPrev || loading}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Previous page"
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                        </button>

                        {/* Page numbers */}
                        {pageNumbers.map((pageNum, index) => {
                            if (pageNum === '...') {
                                return (
                                    <span
                                        key={`ellipsis-${index}`}
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
                                    >
                                        ...
                                    </span>
                                );
                            }

                            const isActive = pageNum === currentPage;

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageClick(pageNum)}
                                    disabled={loading}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed transition-colors ${isActive
                                            ? 'z-10 bg-blue-600 text-white ring-blue-600 hover:bg-blue-700'
                                            : 'text-gray-900'
                                        }`}
                                    aria-label={`Go to page ${pageNum}`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        {/* Next button */}
                        <button
                            onClick={handleNext}
                            disabled={!hasNext || loading}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Next page"
                        >
                            <ChevronRightIcon className="h-5 w-5" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;