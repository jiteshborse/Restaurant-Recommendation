// client/src/components/FilterContainer.jsx
import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { useRestaurants } from '../hooks/useRestaurants';

const FilterContainer = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const {
        filters,
        filterOptions,
        hasActiveFilters,
        setFilter,
        clearFilter,
        clearAllFilters,
        loadFilterOptions
    } = useRestaurants();

    // Load filter options on mount
    useEffect(() => {
        loadFilterOptions();
    }, [loadFilterOptions]);

    // Location Dropdown Component
    const LocationDropdown = () => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
            </label>
            <select
                value={filters.location}
                onChange={(e) => setFilter('location', e.target.value)}
                className="input-field"
            >
                <option value="">All Locations</option>
                {filterOptions.locations.map(location => (
                    <option key={location} value={location}>
                        {location}
                    </option>
                ))}
            </select>
        </div>
    );

    // Cuisine Multi-Select Component
    const CuisineMultiSelect = () => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Cuisines
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2">
                {filterOptions.cuisines.map(cuisine => (
                    <label key={cuisine} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={filters.cuisines.includes(cuisine)}
                            onChange={(e) => {
                                const newCuisines = e.target.checked
                                    ? [...filters.cuisines, cuisine]
                                    : filters.cuisines.filter(c => c !== cuisine);
                                setFilter('cuisines', newCuisines);
                            }}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{cuisine}</span>
                    </label>
                ))}
            </div>
        </div>
    );

    // Rating Selector Component
    const RatingSelector = () => {
        const ratings = [1, 2, 3, 4, 5];

        const renderStars = (rating) => (
            <div className="flex items-center">
                {ratings.map((star) => (
                    <StarIcon
                        key={star}
                        className={`h-4 w-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
            </div>
        );

        return (
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                </label>
                <div className="space-y-2">
                    <button
                        onClick={() => setFilter('minRating', null)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${filters.minRating === null
                                ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        Any Rating
                    </button>
                    {ratings.map(rating => (
                        <button
                            key={rating}
                            onClick={() => setFilter('minRating', rating)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${filters.minRating === rating
                                    ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center space-x-2">
                                {renderStars(rating)}
                                <span>{rating}+</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    // Active Filters Display
    const ActiveFilters = () => {
        if (!hasActiveFilters) return null;

        const activeFilters = [];

        if (filters.location) {
            activeFilters.push({ key: 'location', label: 'Location', value: filters.location });
        }

        if (filters.cuisines.length > 0) {
            activeFilters.push({
                key: 'cuisines',
                label: 'Cuisines',
                value: filters.cuisines.length === 1 ? filters.cuisines[0] : `${filters.cuisines.length} cuisines`
            });
        }

        if (filters.minRating) {
            activeFilters.push({ key: 'minRating', label: 'Min Rating', value: `${filters.minRating}+ stars` });
        }

        if (filters.search) {
            activeFilters.push({ key: 'search', label: 'Search', value: `"${filters.search}"` });
        }

        return (
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Active Filters</h3>
                    <button
                        onClick={clearAllFilters}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Clear all
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {activeFilters.map((filter) => (
                        <div
                            key={filter.key}
                            className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1.5 rounded-full"
                        >
                            <span className="mr-1 font-medium">{filter.label}:</span>
                            <span>{filter.value}</span>
                            <button
                                onClick={() => clearFilter(filter.key)}
                                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 transition-colors"
                            >
                                <XMarkIcon className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const activeFilterCount = [filters.location, filters.search].filter(Boolean).length +
        (filters.cuisines.length > 0 ? 1 : 0) +
        (filters.minRating ? 1 : 0);

    return (
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center justify-between w-full text-left"
                >
                    <div className="flex items-center space-x-3">
                        <FunnelIcon className="h-5 w-5 text-gray-600" />
                        <h2 className="text-lg font-semibold text-gray-900">
                            Filters
                        </h2>
                        {activeFilterCount > 0 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {activeFilterCount}
                            </span>
                        )}
                    </div>

                    {isExpanded ? (
                        <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    )}
                </button>
            </div>

            {/* Expandable content */}
            {isExpanded && (
                <div className="p-6">
                    {/* Active Filters */}
                    <ActiveFilters />

                    {/* Filter Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <LocationDropdown />
                        <CuisineMultiSelect />
                        <RatingSelector />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterContainer;