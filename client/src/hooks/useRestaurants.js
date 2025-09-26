import { useContext, useEffect } from 'react';
import { RestaurantContext } from '../context/RestaurantContext.jsx';

/**
 * Custom hook to interact with restaurant context
 * Provides easy access to restaurant data and actions
 */
export const useRestaurants = () => {
    const context = useContext(RestaurantContext);

    if (!context) {
        throw new Error('useRestaurants must be used within a RestaurantProvider');
    }

    const {
        // State
        restaurants,
        currentRestaurant,
        filterOptions,
        filters,
        pagination,
        loading,
        error,
        sort,
        hasActiveFilters,
        isEmpty,

        // Actions
        loadRestaurants,
        loadRestaurant,
        loadFilterOptions,
        setFilter,
        clearFilter,
        clearAllFilters,
        setPage,
        setSort
    } = context;

    // Auto-load filter options on mount only
    useEffect(() => {
        loadFilterOptions();
    }, []);

    return {
        // Data
        restaurants,
        currentRestaurant,
        filterOptions,
        filters,
        pagination,
        sort,

        // UI State
        loading,
        error,
        hasActiveFilters,
        isEmpty,

        // Actions
        loadRestaurants,
        loadRestaurant,
        loadFilterOptions,
        setFilter,
        clearFilter,
        clearAllFilters,
        setPage,
        setSort,

        // Helper methods
        searchRestaurants: (query) => setFilter('search', query),
        filterByLocation: (location) => setFilter('location', location),
        filterByCuisines: (cuisines) => setFilter('cuisines', cuisines),
        filterByRating: (rating) => setFilter('minRating', rating),
        
        // Pagination helpers
        goToNextPage: () => {
            if (pagination.hasNext) {
                setPage(pagination.currentPage + 1);
            }
        },
        goToPrevPage: () => {
            if (pagination.hasPrev) {
                setPage(pagination.currentPage - 1);
            }
        },
        goToFirstPage: () => setPage(1),
        goToLastPage: () => setPage(pagination.totalPages),

        // Sort helpers
        sortByRating: (order = 'desc') => setSort('rating', order),
        sortByName: (order = 'asc') => setSort('name', order),
        sortByPriceRange: (order = 'asc') => setSort('priceRange', order),
    };
};

export default useRestaurants;