const Restaurant = require('../models/Restaurant');

// Get all restaurants with filters
const getAllRestaurants = async (req, res) => {
    try {
        const {
            location,
            cuisines,
            minRating,
            maxRating,
            priceRange,
            search,
            page = 1,
            limit = 20,
            sort = 'rating',
            sortOrder = 'desc'
        } = req.query;

        // Build filters
        const filter = { isActive: true };


        if (location) {
            filter.location = { $regex: new RegExp(location, 'i') };
        }


        if (cuisines) {
            const cuisineArray = cuisines.split(',').map(c => c.trim());
            filter.cuisines = { $in: cuisineArray };
        }


        if (minRating) {
            filter.rating = { ...filter.rating, $gte: parseFloat(minRating) };
        }
        if (maxRating) {
            filter.rating = { ...filter.rating, $lte: parseFloat(maxRating) };
        }


        if (priceRange) {
            const priceArray = priceRange.split(',').map(p => p.trim());
            filter.priceRange = { $in: priceArray };
        }

        // Build aggregation pipeline
        const pipeline = [];


        pipeline.push({ $match: filter });


        if (search) {
            pipeline.unshift({
                $match: {
                    $and: [
                        filter,
                        { $text: { $search: search } }
                    ]
                }
            });

            pipeline.push({ $addFields: { textScore: { $meta: "textScore" } } });
        }


        const sortObj = {};
        if (search) {
            sortObj.textScore = { $meta: "textScore" };
            sortObj[sort] = sortOrder === 'desc' ? -1 : 1;
        } else {
            sortObj[sort] = sortOrder === 'desc' ? -1 : 1;
        }
        pipeline.push({ $sort: sortObj });


        const countPipeline = [...pipeline, { $count: "total" }];


        const skip = (parseInt(page) - 1) * parseInt(limit);
        pipeline.push({ $skip: skip });
        pipeline.push({ $limit: parseInt(limit) });


        pipeline.push({
            $project: {
                name: 1,
                location: 1,
                cuisines: 1,
                rating: 1,
                imageUrl: 1,
                priceRange: 1,
                description: 1,
                phone: 1,
                'address.city': 1,
                'address.state': 1,
                createdAt: 1,
                updatedAt: 1,
                ...(search && { textScore: 1 })
            }
        });


        const [restaurants, totalResult] = await Promise.all([
            Restaurant.aggregate(pipeline),
            Restaurant.aggregate(countPipeline)
        ]);

        const totalCount = totalResult[0]?.total || 0;
        const totalPages = Math.ceil(totalCount / parseInt(limit));
        const currentPage = parseInt(page);


        res.json({
            success: true,
            data: {
                restaurants,
                pagination: {
                    currentPage,
                    totalPages,
                    totalCount,
                    limit: parseInt(limit),
                    hasNext: currentPage < totalPages,
                    hasPrev: currentPage > 1
                },
                appliedFilters: {
                    location: location || null,
                    cuisines: cuisines ? cuisines.split(',') : null,
                    minRating: minRating ? parseFloat(minRating) : null,
                    maxRating: maxRating ? parseFloat(maxRating) : null,
                    priceRange: priceRange ? priceRange.split(',') : null,
                    search: search || null,
                    sort,
                    sortOrder
                }
            },
            message: `${totalCount} restaurants found`
        });
    } catch (error) {
        console.error('Get restaurants error:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'QUERY_ERROR',
                message: 'Error retrieving restaurants',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            }
        });
    }
};

// Get restaurant by ID
const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({
            _id: req.params.id,
            isActive: true
        });

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'RESTAURANT_NOT_FOUND',
                    message: 'Restaurant not found',
                    restaurantId: req.params.id
                }
            });
        }

        res.json({
            success: true,
            data: {
                restaurant
            },
            message: 'Restaurant retrieved successfully'
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'INVALID_ID',
                    message: 'Invalid restaurant ID format'
                }
            });
        }

        res.status(500).json({
            success: false,
            error: {
                code: 'SERVER_ERROR',
                message: 'Error retrieving restaurant'
            }
        });
    }
};

// Create restaurant
const createRestaurant = async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        const savedRestaurant = await restaurant.save();

        res.status(201).json({
            success: true,
            data: {
                restaurant: savedRestaurant
            },
            message: 'Restaurant created successfully'
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid restaurant data',
                    details: Object.keys(error.errors).map(key => ({
                        field: key,
                        message: error.errors[key].message
                    }))
                }
            });
        }

        res.status(500).json({
            success: false,
            error: {
                code: 'CREATE_ERROR',
                message: 'Error creating restaurant'
            }
        });
    }
};

// Update restaurant
const updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOneAndUpdate(
            { _id: req.params.id, isActive: true },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'RESTAURANT_NOT_FOUND',
                    message: 'Restaurant not found',
                    restaurantId: req.params.id
                }
            });
        }

        res.json({
            success: true,
            data: {
                restaurant
            },
            message: 'Restaurant updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: {
                code: 'UPDATE_ERROR',
                message: 'Error updating restaurant'
            }
        });
    }
};

// Delete restaurant
const deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'RESTAURANT_NOT_FOUND',
                    message: 'Restaurant not found',
                    restaurantId: req.params.id
                }
            });
        }

        // Soft delete
        restaurant.isActive = false;
        await restaurant.save();

        res.json({
            success: true,
            data: {
                restaurantId: req.params.id
            },
            message: 'Restaurant deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: {
                code: 'DELETE_ERROR',
                message: 'Error deleting restaurant'
            }
        });
    }
};

// Get filter options
const getFilterOptions = async (req, res) => {
    try {
        const [locations, cuisines, priceRanges] = await Promise.all([
            Restaurant.distinct('location', { isActive: true }),
            Restaurant.distinct('cuisines', { isActive: true }),
            Restaurant.distinct('priceRange', { isActive: true })
        ]);

        res.json({
            success: true,
            data: {
                locations: locations.sort(),
                cuisines: cuisines.sort(),
                priceRanges: priceRanges.sort()
            },
            message: 'Filter options retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: {
                code: 'FILTER_OPTIONS_ERROR',
                message: 'Error retrieving filter options'
            }
        });
    }
};

// Get restaurant statistics
const getRestaurantStats = async (req, res) => {
    try {
        const stats = await Restaurant.aggregate([
            { $match: { isActive: true } },
            {
                $group: {
                    _id: null,
                    totalRestaurants: { $sum: 1 },
                    averageRating: { $avg: '$rating' }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalRestaurants: 1,
                    averageRating: { $round: ['$averageRating', 2] }
                }
            }
        ]);

        const locationStats = await Restaurant.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$location', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const cuisineStats = await Restaurant.aggregate([
            { $match: { isActive: true } },
            { $unwind: '$cuisines' },
            { $group: { _id: '$cuisines', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const priceRangeStats = await Restaurant.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$priceRange', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            success: true,
            data: {
                overview: stats[0] || {
                    totalRestaurants: 0,
                    averageRating: 0
                },
                byLocation: locationStats,
                byCuisine: cuisineStats,    
                byPriceRange: priceRangeStats
            },
            message: 'Restaurant statistics retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: {
                code: 'STATS_ERROR',
                message: 'Error retrieving statistics'
            }
        });
    }
};

module.exports = {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getFilterOptions,
    getRestaurantStats
};