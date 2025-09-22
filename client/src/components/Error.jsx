import React from 'react';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const Error = ({
    title = 'Something went wrong',
    message = 'An unexpected error occurred. Please try again.',
    showRetry = false,
    onRetry = null,
    className = ''
}) => {
    return (
        <div className={`text-center py-12 ${className}`}>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {title}
            </h3>

            <p className="text-gray-600 max-w-md mx-auto mb-6">
                {message}
            </p>

            {showRetry && onRetry && (
                <button
                    onClick={onRetry}
                    className="btn-primary inline-flex items-center"
                >
                    <ArrowPathIcon className="h-4 w-4 mr-2" />
                    Try Again
                </button>
            )}
        </div>
    );
};

// Network error component
export const NetworkError = ({ onRetry }) => (
    <Error
        title="Connection Error"
        message="Unable to connect to the server. Please check your internet connection and try again."
        showRetry={true}
        onRetry={onRetry}
    />
);

// No results component
export const NoResults = ({ searchTerm, hasFilters, onClearFilters }) => (
    <div className="text-center py-12">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
            <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No restaurants found
        </h3>

        <p className="text-gray-600 max-w-md mx-auto mb-6">
            {searchTerm
                ? `No results for "${searchTerm}". Try adjusting your search or filters.`
                : hasFilters
                    ? 'No restaurants match your current filters. Try adjusting your criteria.'
                    : 'No restaurants available at the moment.'
            }
        </p>

        {(hasFilters || onClearFilters) && (
            <button
                onClick={onClearFilters}
                className="btn-primary"
            >
                Clear Filters
            </button>
        )}
    </div>
);

export default Error;