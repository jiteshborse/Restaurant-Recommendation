// client/src/pages/RestaurantDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    StarIcon,
    MapPinIcon,
    PhoneIcon,
    CurrencyDollarIcon,
    ArrowLeftIcon,
    ClockIcon
} from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { useRestaurants } from '../hooks/useRestaurants';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { generateStarRating, formatPhoneNumber, formatPriceRange } from '../utils/helpers';

const RestaurantDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentRestaurant, loading, error, loadRestaurant } = useRestaurants();
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (id) {
            loadRestaurant(id);
        }
    }, [id, loadRestaurant]);

    const handleImageError = () => {
        setImageError(true);
    };

    // Generate star rating display
    const renderStars = (rating) => {
        const stars = generateStarRating(rating);

        return stars.map((type, index) => {
            if (type === 'full') {
                return <StarIcon key={index} className="h-5 w-5 text-yellow-400" />;
            } else if (type === 'half') {
                return (
                    <div key={index} className="relative">
                        <StarOutlineIcon className="h-5 w-5 text-yellow-400" />
                        <div className="absolute inset-0 overflow-hidden w-1/2">
                            <StarIcon className="h-5 w-5 text-yellow-400" />
                        </div>
                    </div>
                );
            } else {
                return <StarOutlineIcon key={index} className="h-5 w-5 text-gray-300" />;
            }
        });
    };

    if (loading) {
        return <Loading size="lg" text="Loading restaurant details..." />;
    }

    if (error) {
        return (
            <Error
                title="Restaurant Not Found"
                message={error.message || "We couldn't find the restaurant you're looking for."}
                showRetry={true}
                onRetry={() => navigate('/')}
            />
        );
    }

    if (!currentRestaurant) {
        return (
            <Error
                title="Restaurant Not Found"
                message="We couldn't find the restaurant you're looking for."
                showRetry={false}
            />
        );
    }

    const {
        name,
        location,
        cuisines,
        rating,
        imageUrl,
        priceRange,
        description,
        phone,
        address,
        hours
    } = currentRestaurant;

    return (
        <div className="space-y-6">
            {/* Back Navigation */}
            <div className="flex items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Results
                </button>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    {/* Image Section */}
                    <div className="md:w-1/2">
                        <div className="aspect-video md:aspect-square relative">
                            {!imageError ? (
                                <img
                                    src={imageUrl}
                                    alt={`${name} restaurant`}
                                    className="w-full h-full object-cover"
                                    onError={handleImageError}
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                                            <span className="text-4xl">🍴</span>
                                        </div>
                                        <p className="text-lg text-gray-500 font-medium">{name}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="md:w-1/2 p-8">
                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>

                            {/* Rating */}
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="flex items-center">
                                    {renderStars(rating)}
                                </div>
                                <span className="text-lg font-semibold text-gray-900">
                                    {rating.toFixed(1)}
                                </span>
                                <span className="text-sm text-gray-500">
                                    (Based on customer reviews)
                                </span>
                            </div>

                            {/* Location */}
                            <div className="flex items-center text-gray-600 mb-2">
                                <MapPinIcon className="h-5 w-5 mr-2" />
                                <span>{location}</span>
                            </div>

                            {/* Price Range */}
                            <div className="flex items-center text-gray-600">
                                <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                                <span>{priceRange} • {formatPriceRange(priceRange)}</span>
                            </div>
                        </div>

                        {/* Cuisines */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cuisines</h3>
                            <div className="flex flex-wrap gap-2">
                                {cuisines.map((cuisine) => (
                                    <span
                                        key={cuisine}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800"
                                    >
                                        {cuisine}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        {description && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                                <p className="text-gray-600 leading-relaxed">{description}</p>
                            </div>
                        )}

                        {/* Contact Info */}
                        <div className="space-y-4">
                            {phone && (
                                <div className="flex items-center">
                                    <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Phone</p>
                                        <a
                                            href={`tel:${phone}`}
                                            className="text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            {formatPhoneNumber(phone)}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {address && (
                                <div className="flex items-start">
                                    <MapPinIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Address</p>
                                        <p className="text-gray-600">
                                            {address.street}<br />
                                            {address.city}, {address.state} {address.zipCode}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hours Section */}
                {hours && (
                    <div className="border-t border-gray-200 px-8 py-6">
                        <div className="flex items-center mb-4">
                            <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-900">Hours</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(hours).map(([day, time]) => (
                                <div key={day} className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-900 capitalize">
                                        {day}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        {time || 'Closed'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="border-t border-gray-200 px-8 py-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {phone && (
                            <a
                                href={`tel:${phone}`}
                                className="btn-primary flex items-center justify-center"
                            >
                                <PhoneIcon className="h-4 w-4 mr-2" />
                                Call Restaurant
                            </a>
                        )}

                        {address && (
                            <a
                                href={`https://maps.google.com/?q=${encodeURIComponent(
                                    `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary flex items-center justify-center"
                            >
                                <MapPinIcon className="h-4 w-4 mr-2" />
                                Get Directions
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="text-center">
                <Link
                    to="/"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Back to All Restaurants
                </Link>
            </div>
        </div>
    );
};

export default RestaurantDetail;