import React from 'react';

const Loading = ({ size = 'md', text = 'Loading...', fullScreen = false }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    };

    const textSizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
    };

    const LoadingSpinner = () => (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className={`${sizeClasses[size]} animate-spin`}>
                <svg
                    className="w-full h-full text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            </div>

            {text && (
                <p className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
                    {text}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center py-12">
            <LoadingSpinner />
        </div>
    );
};

// Restaurant skeleton loader for better UX
export const RestaurantSkeleton = () => (
    <div className="card animate-pulse p-0 overflow-hidden">
        {/* Image skeleton */}
        <div className="aspect-video bg-gray-300"></div>

        {/* Content skeleton */}
        <div className="p-4">
            {/* Title skeleton */}
            <div className="h-5 bg-gray-300 rounded mb-2"></div>

            {/* Location skeleton */}
            <div className="flex items-center mb-3">
                <div className="h-4 w-4 bg-gray-300 rounded mr-2"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>

            {/* Rating skeleton */}
            <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 w-4 bg-gray-300 rounded"></div>
                ))}
                <div className="h-4 bg-gray-300 rounded w-12 ml-2"></div>
            </div>

            {/* Cuisines skeleton */}
            <div className="flex space-x-2 mb-3">
                <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                <div className="h-6 bg-gray-300 rounded-full w-20"></div>
            </div>

            {/* Description skeleton */}
            <div className="space-y-2 mb-3">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>

            {/* Button skeleton */}
            <div className="h-8 bg-gray-300 rounded w-24"></div>
        </div>
    </div>
);

export default Loading;