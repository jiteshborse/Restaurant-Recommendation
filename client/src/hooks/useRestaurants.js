import { useContext, useEffect } from 'react';
import { RestaurantContext } from '../context/RestaurantContext.jsx';

export const useRestaurants = () => {
    const context = useContext(RestaurantContext);

    if (!context) {
        throw new Error('useRestaurants must be used within a RestaurantProvider');
    }

    const {
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
        loadRestaurants,
        loadRestaurant,
        loadFilterOptions,
        setFilter,
        clearFilter,
        clearAllFilters,
        setPage,
        setSort
    } = context;

    useEffect(() => {
        loadRestaurants();
    }, [loadRestaurants]);

    useEffect(() => {
        loadFilterOptions();
    }, [loadFilterOptions]);

    return {
        restaurants,
        currentRestaurant,
        filterOptions,
        filters,
        pagination,
        sort,
        loading,
        error,
        hasActiveFilters,
        isEmpty,
        loadRestaurants,
        loadRestaurant,
        loadFilterOptions,
        setFilter,
        clearFilter,
        clearAllFilters,
        setPage,
        setSort,
        searchRestaurants: (query) => setFilter('search', query),
        filterByLocation: (location) => setFilter('location', location),
        filterByCuisines: (cuisines) => setFilter('cuisines', cuisines),
        filterByRating: (rating) => setFilter('minRating', rating),
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
        sortByRating: (order = 'desc') => setSort('rating', order),
        sortByName: (order = 'asc') => setSort('name', order),
        sortByPriceRange: (order = 'asc') => setSort('priceRange', order),
    };
};

export default useRestaurants;