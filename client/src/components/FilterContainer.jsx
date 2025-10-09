import React, { useState, useEffect } from 'react';
import { useRestaurants } from '../hooks/useRestaurants';
import { useDebounce } from '../hooks/useDebounce';
import { 
    MagnifyingGlassIcon, 
    MapPinIcon, 
    StarIcon, 
    CurrencyDollarIcon,
    FunnelIcon,
    XMarkIcon,
    AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

const FilterContainer = () => {
    const {
        filterOptions,
        filters,
        setFilter,
        clearFilter,
        clearAllFilters,
        hasActiveFilters,
        loadRestaurants
    } = useRestaurants();

    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        setFilter('search', debouncedSearchTerm);
    }, [debouncedSearchTerm, setFilter]);

    const handleLocationChange = (location) => {
        if (filters.location === location) {
            clearFilter('location');
        } else {
            setFilter('location', location);
        }
    };

    const handleCuisineToggle = (cuisine) => {
        const currentCuisines = filters.cuisines || [];
        const newCuisines = currentCuisines.includes(cuisine)
            ? currentCuisines.filter(c => c !== cuisine)
            : [...currentCuisines, cuisine];
        setFilter('cuisines', newCuisines);
    };

    const handleRatingChange = (rating) => {
        if (filters.minRating === rating) {
            clearFilter('minRating');
        } else {
            setFilter('minRating', rating);
        }
    };

    const priceRanges = [
        { value: '$', label: 'Budget ($10-25)', icon: '💰' },
        { value: '$$', label: 'Moderate ($25-50)', icon: '💳' },
        { value: '$$$', label: 'Expensive ($50-100)', icon: '💎' },
        { value: '$$$$', label: 'Luxury ($100+)', icon: '👑' }
    ];

    const ratings = [
        { value: 4.5, label: '4.5+ Stars', icon: '⭐' },
        { value: 4.0, label: '4.0+ Stars', icon: '⭐' },
        { value: 3.5, label: '3.5+ Stars', icon: '⭐' },
        { value: 3.0, label: '3.0+ Stars', icon: '⭐' }
    ];

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="card p-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search restaurants by name, cuisine, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input pl-14 pr-6"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-0 pr-6 flex items-center"
                        >
                            <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                        </button>
                    )}
                </div>
            </div>

            {/* Filter Controls */}
            <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                            <FunnelIcon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                        {hasActiveFilters && (
                            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 rounded-full text-sm font-semibold">
                                Active
                            </span>
                        )}
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                            className="flex items-center space-x-2 px-4 py-2 bg-white/80 hover:bg-white/90 rounded-xl transition-all duration-300 border border-white/50"
                        >
                            <AdjustmentsHorizontalIcon className="h-4 w-4" />
                            <span className="text-sm font-medium">
                                {showAdvancedFilters ? 'Simple' : 'Advanced'}
                            </span>
                        </button>
                        {hasActiveFilters && (
                            <button
                                onClick={clearAllFilters}
                                className="flex items-center space-x-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl transition-all duration-300"
                            >
                                <XMarkIcon className="h-4 w-4" />
                                <span className="text-sm font-medium">Clear All</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Location Filter */}
                <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                        <MapPinIcon className="h-5 w-5 text-purple-600" />
                        <label className="text-sm font-semibold text-gray-700">Location</label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {filterOptions.locations?.map((location) => (
                            <button
                                key={location}
                                onClick={() => handleLocationChange(location)}
                                className={`filter-chip ${
                                    filters.location === location
                                        ? 'filter-chip-active'
                                        : 'filter-chip-inactive'
                                }`}
                            >
                                📍 {location}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cuisine Filter */}
                <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                        <span className="text-lg">🍽️</span>
                        <label className="text-sm font-semibold text-gray-700">Cuisine</label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {filterOptions.cuisines?.slice(0, showAdvancedFilters ? undefined : 8).map((cuisine) => (
                            <button
                                key={cuisine}
                                onClick={() => handleCuisineToggle(cuisine)}
                                className={`filter-chip ${
                                    filters.cuisines?.includes(cuisine)
                                        ? 'filter-chip-active'
                                        : 'filter-chip-inactive'
                                }`}
                            >
                                {cuisine}
                            </button>
                        ))}
                        {!showAdvancedFilters && filterOptions.cuisines?.length > 8 && (
                            <button
                                onClick={() => setShowAdvancedFilters(true)}
                                className="filter-chip filter-chip-inactive text-purple-600 border-purple-300"
                            >
                                +{filterOptions.cuisines.length - 8} more
                            </button>
                        )}
                    </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        <label className="text-sm font-semibold text-gray-700">Minimum Rating</label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {ratings.map((rating) => (
                            <button
                                key={rating.value}
                                onClick={() => handleRatingChange(rating.value)}
                                className={`filter-chip ${
                                    filters.minRating === rating.value
                                        ? 'filter-chip-active'
                                        : 'filter-chip-inactive'
                                }`}
                            >
                                {rating.icon} {rating.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range Filter (Advanced) */}
                {showAdvancedFilters && (
                    <div className="mb-6">
                        <div className="flex items-center space-x-2 mb-3">
                            <CurrencyDollarIcon className="h-5 w-5 text-green-600" />
                            <label className="text-sm font-semibold text-gray-700">Price Range</label>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {priceRanges.map((price) => (
                                <button
                                    key={price.value}
                                    onClick={() => {
                                        if (filters.priceRange === price.value) {
                                            clearFilter('priceRange');
                                        } else {
                                            setFilter('priceRange', price.value);
                                        }
                                    }}
                                    className={`filter-chip ${
                                        filters.priceRange === price.value
                                            ? 'filter-chip-active'
                                            : 'filter-chip-inactive'
                                    }`}
                                >
                                    {price.icon} {price.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Active Filters Summary */}
                {hasActiveFilters && (
                    <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">
                                {Object.values(filters).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length} filters active
                            </span>
                            <button
                                onClick={loadRestaurants}
                                className="btn-primary text-sm py-2 px-4"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterContainer;