import React, { useEffect } from "react";
import { useRestaurants } from "../hooks/useRestaurants";
import FilterContainer from "../components/FilterContainer";
import RestaurantList from "../components/RestaurantList";
import Pagination from "../components/Pagination";
import {
  MagnifyingGlassIcon,
  SparklesIcon,
  MapPinIcon,
  CheckCircleIcon,
  FireIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const { loadRestaurants } = useRestaurants();

  useEffect(() => {
    loadRestaurants();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden mb-12">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

        <div className="relative z-10">
          {/* Main Hero */}
          <div className="hero-gradient rounded-3xl p-12 md:p-16 text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-75"></div>
                <div className="relative p-4 bg-white/10 backdrop-blur-sm rounded-2xl animate-float">
                  <SparklesIcon className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-black text-white mb-4 text-shadow tracking-tight leading-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent animate-pulse-slow">
                Perfect Meal
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Explore curated restaurants with smart filters, real ratings, and
              personalized recommendations.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/30 flex items-center space-x-2 text-white/90 hover:bg-white/20 transition-all duration-300">
                <MagnifyingGlassIcon className="h-5 w-5" />
                <span className="font-semibold">Smart Search</span>
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/30 flex items-center space-x-2 text-white/90 hover:bg-white/20 transition-all duration-300">
                <MapPinIcon className="h-5 w-5" />
                <span className="font-semibold">Location Based</span>
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/30 flex items-center space-x-2 text-white/90 hover:bg-white/20 transition-all duration-300">
                <FireIcon className="h-5 w-5" />
                <span className="font-semibold">Trending Now</span>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl font-bold text-yellow-300 mb-1">
                  15+
                </div>
                <div className="text-white/80 text-sm font-medium">
                  Top Restaurants
                </div>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl font-bold text-blue-300 mb-1">12+</div>
                <div className="text-white/80 text-sm font-medium">
                  Cuisines
                </div>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl font-bold text-pink-300 mb-1">
                  4.3★
                </div>
                <div className="text-white/80 text-sm font-medium">
                  Avg Rating
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group card p-8 hover:shadow-2xl">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircleIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Verified Ratings
              </h3>
              <p className="text-gray-600">
                Honest reviews from real customers with detailed ratings and
                feedback.
              </p>
            </div>

            <div className="group card p-8 hover:shadow-2xl">
              <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPinIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Location Insights
              </h3>
              <p className="text-gray-600">
                Find restaurants near you with detailed address and contact
                information.
              </p>
            </div>

            <div className="group card p-8 hover:shadow-2xl">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <UserGroupIcon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Community Favorites
              </h3>
              <p className="text-gray-600">
                Explore the most loved restaurants and trending dining spots.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Results Section */}
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Find Your Favorite
          </h2>
          <FilterContainer />
        </div>
        <RestaurantList />
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
