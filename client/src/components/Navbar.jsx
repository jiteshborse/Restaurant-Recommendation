import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRestaurants } from '../hooks/useRestaurants';
import { useDebounce } from '../hooks/useDebounce';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const { setFilter } = useRestaurants();

    // Debounce search input
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Update search filter when debounced term changes
    React.useEffect(() => {
        setFilter('search', debouncedSearchTerm);
    }, [debouncedSearchTerm, setFilter]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setFilter('search', '');
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">RF</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 hidden sm:block">
                            RestaurantFinder
                        </span>
                    </Link>

                    {/* Desktop Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-8">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search restaurants, cuisines..."
                                className="input-field pl-10 pr-10"
                            />
                            {searchTerm && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/about'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                }`}
                        >
                            About
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="block h-6 w-6" />
                            ) : (
                                <Bars3Icon className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden pb-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search restaurants..."
                            className="input-field pl-10 pr-10"
                        />
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 border-t border-gray-200">
                        <Link
                            to="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${location.pathname === '/'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${location.pathname === '/about'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                                }`}
                        >
                            About
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;