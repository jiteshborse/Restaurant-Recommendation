import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    StarIcon,
    MapPinIcon,
    PhoneIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { generateStarRating, formatPhoneNumber, truncateText } from '../utils/helpers';

const RestaurantCard = ({ restaurant }) => {
    const [imageError, setImageError] = useState(false);

    const {
        _id,
        name,
        location,
        cuisines,
        rating,
        imageUrl,
        priceRange,
        description,
        phone
    } = restaurant;

    const handleImageError = () => {
        setImageError(true);
    };

    // Generate star rating display
    const renderStars = (rating) => {
        const stars = generateStarRating(rating);

        return stars.map((type, index) => {
            if (type === 'full') {
                return <StarIcon key={index} className="h-4 w-4 text-yellow-400" />;
            } else if (type === 'half') {
                return (
                    <div key={index} className="relative">
                        <StarOutlineIcon className="h-4 w-4 text-yellow-400" />
                        <div className="absolute inset-0 overflow-hidden w-1/2">
                            <StarIcon className="h-4 w-4 text-yellow-400" />
                        </div>
                    </div>
                );
            } else {
                return <StarOutlineIcon key={index} className="h-4 w-4 text-gray-300" />;
            }
        });
    };

    return (
        <div className="card p-0 overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
            {/* Image */}
            <div className="relative aspect-video overflow-hidden">
                {!imageError ? (
                    <img
                        src={imageUrl}
                        alt={`${name} restaurant`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={handleImageError}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🍴</span>
                            </div>
                            <p className="text-sm text-gray-500 font-medium">{name}</p>
                        </div>
                    </div>
                )}

                {/* Price Range Badge */}
                <div className="absolute top-3 right-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center shadow-sm">
                    <CurrencyDollarIcon className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-gray-900 ml-1">
                        {priceRange}
                    </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-full px-2 py-1 flex items-center shadow-sm">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-900 ml-1">
                        {rating.toFixed(1)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Header */}
                <div className="mb-3">
                    <Link
                        to={`/restaurant/${_id}`}
                        className="block hover:text-blue-600 transition-colors"
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                            {name}
                        </h3>
                    </Link>

                    {/* Location */}
                    <div className="flex items-center text-sm text-gray-500">
                        <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{location}</span>
                    </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                        {renderStars(rating)}
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                        ({rating.toFixed(1)})
                    </span>
                </div>

                {/* Cuisines */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {cuisines.slice(0, 3).map((cuisine) => (
                        <span
                            key={cuisine}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800"
                        >
                            {cuisine}
                        </span>
                    ))}
                    {cuisines.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            +{cuisines.length - 3} more
                        </span>
                    )}
                </div>

                {/* Description */}
                {description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {truncateText(description, 100)}
                    </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                        <PhoneIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{formatPhoneNumber(phone)}</span>
                    </div>

                    <Link
                        to={`/restaurant/${_id}`}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;