import React, { useEffect } from 'react';
import { useRestaurants } from '../hooks/useRestaurants';
import FilterContainer from '../components/FilterContainer';
import RestaurantList from '../components/RestaurantList';
import Pagination from '../components/Pagination';
import { MagnifyingGlassIcon, SparklesIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Home = () => {
    const { loadRestaurants } = useRestaurants();

    useEffect(() => {
        loadRestaurants();
    }, []);

    return (
        <div className="min-h-screen">
            <div className="hero-gradient rounded-3xl p-8 mb-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl"></div>
                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl animate-float">
                            <SparklesIcon className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6 text-shadow tracking-tight">
                        Discover Amazing
                        <span className="block gradient-text bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Restaurants
                        </span>
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Find the perfect dining experience with our smart filters and search.
                        Explore restaurants by location, cuisine, rating, and more.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-6 text-white/80">
                        <div className="flex items-center space-x-2">
                            <MagnifyingGlassIcon className="h-5 w-5" />
                            <span>Smart Search</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPinIcon className="h-5 w-5" />
                            <span>Location Based</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <SparklesIcon className="h-5 w-5" />
                            <span>Curated Selection</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <FilterContainer />
                <RestaurantList />
                <Pagination />
            </div>
        </div>
    );
};

export default Home;