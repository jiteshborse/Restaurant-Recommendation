// client/src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const NotFound = () => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                {/* 404 Illustration */}
                <div className="mb-8">
                    <div className="mx-auto h-32 w-32 text-gray-300">
                        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 max-w-md mx-auto">
                        Sorry, we couldn't find the page you're looking for.
                        The page might have been moved, deleted, or you entered the wrong URL.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="btn-primary inline-flex items-center"
                    >
                        <HomeIcon className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>

                    <Link
                        to="/?search="
                        className="btn-secondary inline-flex items-center"
                    >
                        <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                        Search Restaurants
                    </Link>
                </div>

                {/* Additional Help */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Need help? Try going back to the{' '}
                        <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
                            homepage
                        </Link>{' '}
                        or use our search to find what you're looking for.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;