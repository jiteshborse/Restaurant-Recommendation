import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    StarIcon,
    MapPinIcon,
    PhoneIcon,
    CurrencyDollarIcon,
    HeartIcon
} from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon, HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { generateStarRating, formatPhoneNumber, truncateText } from '../utils/helpers';

const RestaurantCard = ({ restaurant }) => {
    const [imageError, setImageError] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

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

    const getPriceInfo = (priceRange) => {
        const priceMap = {
            '$': { range: '$10-25', avg: '$18' },
            '$$': { range: '$25-50', avg: '$38' },
            '$$$': { range: '$50-100', avg: '$75' },
            '$$$$': { range: '$100+', avg: '$150' }
        };
        return priceMap[priceRange] || { range: 'N/A', avg: 'N/A' };
    };

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
        <div className="card p-0 overflow-hidden group">
            <div className="relative aspect-video overflow-hidden">
                {!imageError ? (
                    <img
                        src={imageUrl}
                        alt={`${name} restaurant`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        onError={handleImageError}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🍴</span>
                            </div>
                            <p className="text-sm text-gray-600 font-medium">{name}</p>
                        </div>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                >
                    {isLiked ? (
                        <HeartIcon className="h-5 w-5 text-red-500" />
                    ) : (
                        <HeartOutlineIcon className="h-5 w-5 text-gray-600" />
                    )}
                </button>

                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center shadow-lg">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-900 ml-1">
                        {rating.toFixed(1)}
                    </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl px-3 py-2 shadow-lg">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <CurrencyDollarIcon className="h-3 w-3" />
                            <span className="text-xs font-bold ml-1">
                                {priceRange}
                            </span>
                        </div>
                        <div className="text-xs font-medium opacity-90">
                            {getPriceInfo(priceRange).avg}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="mb-4">
                    <Link
                        to={`/restaurant/${_id}`}
                        className="block hover:text-purple-600 transition-colors duration-300"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors duration-300">
                            {name}
                        </h3>
                    </Link>

                    <div className="flex items-center text-sm text-gray-500 mb-3">
                        <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0 text-purple-500" />
                        <span className="truncate">{location}</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center">
                            {renderStars(rating)}
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                            ({rating.toFixed(1)})
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {cuisines.slice(0, 3).map((cuisine) => (
                        <span
                            key={cuisine}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border border-purple-200"
                        >
                            {cuisine}
                        </span>
                    ))}
                    {cuisines.length > 3 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                            +{cuisines.length - 3} more
                        </span>
                    )}
                </div>

                {description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {truncateText(description, 100)}
                    </p>
                )}

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 mb-4 border border-green-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <CurrencyDollarIcon className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-semibold text-green-800">Price Range</span>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-bold text-green-700">{priceRange}</div>
                            <div className="text-xs text-green-600">{getPriceInfo(priceRange).range}</div>
                        </div>
                    </div>
                    <div className="mt-2 text-center">
                        <span className="text-sm text-green-700 font-medium">
                            Avg: {getPriceInfo(priceRange).avg} per person
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                        <PhoneIcon className="h-4 w-4 mr-1 flex-shrink-0 text-purple-500" />
                        <span className="truncate">{formatPhoneNumber(phone)}</span>
                    </div>

                    <Link
                        to={`/restaurant/${_id}`}
                        className="btn-primary text-sm py-2 px-4"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;