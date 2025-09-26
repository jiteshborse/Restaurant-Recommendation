import React from 'react';
import RestaurantCard from './RestaurantCard';
import { RestaurantSkeleton } from './Loading';
import { NoResults } from './Error';
import { useRestaurants } from '../hooks/useRestaurants';

const RestaurantList = () => {
    const {
        restaurants,
        loading,
        error,
        hasActiveFilters,
        filters,
        clearAllFilters
    } = useRestaurants();

    // Loading state with skeletons
    if (loading) {
        return (
            <div>
                {/* Results header skeleton */}
                <div className="flex items-center justify-between mb-6">
                    <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
                    <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
                </div>

                {/* Restaurant grid skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <RestaurantSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="text-center py-12">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                    <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Failed to load restaurants
                </h3>

                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {error.message || 'Something went wrong while loading restaurants. Please try again.'}
                </p>

                <button
                    onClick={() => window.location.reload()}
                    className="btn-primary"
                >
                    Try Again
                </button>
            </div>
        );
    }

    // Empty state
    if (!restaurants.length) {
        return (
            <NoResults
                searchTerm={filters.search}
                hasFilters={hasActiveFilters}
                onClearFilters={clearAllFilters}
            />
        );
    }

    // Success state - render restaurant grid
    return (
        <div>
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                    {restaurants.length} {restaurants.length === 1 ? 'Restaurant' : 'Restaurants'} Found
                </h2>

                {hasActiveFilters && (
                    <button
                        onClick={clearAllFilters}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        Clear all filters
                    </button>
                )}
            </div>

            {/* Search term display */}
            {filters.search && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                        Showing results for <span className="font-semibold">"{filters.search}"</span>
                    </p>
                </div>
            )}

            {/* Restaurant grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {restaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant._id}
                        restaurant={restaurant}
                    />
                ))}
            </div>

            {/* Load more hint for future infinite scroll */}
            {restaurants.length >= 20 && (
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        Use pagination below to see more restaurants
                    </p>
                </div>
            )}
        </div>
    );
};

export default RestaurantList;