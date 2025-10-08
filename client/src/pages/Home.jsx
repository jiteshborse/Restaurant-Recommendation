// client/src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useRestaurants } from '../hooks/useRestaurants';
import FilterContainer from '../components/FilterContainer';
import RestaurantList from '../components/RestaurantList';
import Pagination from '../components/Pagination';

const Home = () => {
    const { loadRestaurants, loadFilterOptions } = useRestaurants();

    // Load initial data
    useEffect(() => {
        const initializeData = async () => {
            await Promise.all([
                loadFilterOptions(),
                loadRestaurants()
            ]);
        };

        initializeData();
    }, [loadFilterOptions, loadRestaurants]);

    // Reload restaurants when filters or pagination change
    useEffect(() => {
        loadRestaurants();
    }, [loadRestaurants]);

    return (
        <div className="space-y-6">
            {/* Hero Section */}
            <div className="text-center py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Discover Amazing Restaurants
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Find the perfect dining experience with our smart filters and search.
                    Explore restaurants by location, cuisine, rating, and more.
                </p>
            </div>

            {/* Filters */}
            <FilterContainer />

            {/* Results */}
            <RestaurantList />

            {/* Pagination */}
            <Pagination />
        </div>
    );
};

export default Home;