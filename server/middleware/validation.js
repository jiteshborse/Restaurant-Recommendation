// server/middleware/validation.js
const Joi = require('joi');

// Restaurant query validation schema
const restaurantQuerySchema = Joi.object({
    location: Joi.string().max(50).optional(),
    cuisines: Joi.string().pattern(/^[a-zA-Z,\s]+$/).optional(),
    minRating: Joi.number().min(1).max(5).optional(),
    maxRating: Joi.number().min(1).max(5).optional(),
    priceRange: Joi.string().pattern(/^[\$,]+$/).optional(),
    search: Joi.string().max(100).optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(20),
    sort: Joi.string().valid('name', 'rating', 'createdAt', 'location').default('rating'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc')
});

// Restaurant creation/update validation schema
const restaurantSchema = Joi.object({
    name: Joi.string().max(100).required().messages({
        'string.empty': 'Restaurant name is required',
        'string.max': 'Restaurant name cannot exceed 100 characters'
    }),

    location: Joi.string().max(50).required().messages({
        'string.empty': 'Location is required',
        'string.max': 'Location cannot exceed 50 characters'
    }),

    cuisines: Joi.array().items(
        Joi.string().valid(
            'Italian', 'Chinese', 'Indian', 'Mexican', 'Thai', 'Japanese',
            'American', 'French', 'Mediterranean', 'Korean', 'Vietnamese',
            'Greek', 'Spanish', 'Brazilian', 'Lebanese', 'Turkish'
        )
    ).min(1).required().messages({
        'array.min': 'At least one cuisine must be selected',
        'any.required': 'Cuisines are required'
    }),

    rating: Joi.number().min(1).max(5).precision(1).required().messages({
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating cannot exceed 5',
        'any.required': 'Rating is required'
    }),

    address: Joi.object({
        street: Joi.string().required().messages({
            'string.empty': 'Street address is required'
        }),
        city: Joi.string().required().messages({
            'string.empty': 'City is required'
        }),
        state: Joi.string().max(50).required().messages({
            'string.empty': 'State is required',
            'string.max': 'State cannot exceed 50 characters'
        }),
        zipCode: Joi.string().pattern(/^\d{5}(-\d{4})?$/).required().messages({
            'string.empty': 'Zip code is required',
            'string.pattern.base': 'Please enter a valid zip code (e.g., 12345 or 12345-6789)'
        })
    }).required(),

    phone: Joi.string().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/).required().messages({
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Phone format must be: (123) 456-7890'
    }),

    imageUrl: Joi.string().uri().pattern(/\.(jpg|jpeg|png|webp)(\?.*)?$/i).required().messages({
        'string.empty': 'Image URL is required',
        'string.uri': 'Please provide a valid URL',
        'string.pattern.base': 'Image must be a valid URL ending in jpg, jpeg, png, or webp'
    }),

    priceRange: Joi.string().valid('$', '$$', '$$$', '$$$$').required().messages({
        'any.only': 'Price range must be one of: $, $$, $$$, $$$$',
        'any.required': 'Price range is required'
    }),

    description: Joi.string().max(500).optional().messages({
        'string.max': 'Description cannot exceed 500 characters'
    }),

    hours: Joi.object({
        monday: Joi.string().optional(),
        tuesday: Joi.string().optional(),
        wednesday: Joi.string().optional(),
        thursday: Joi.string().optional(),
        friday: Joi.string().optional(),
        saturday: Joi.string().optional(),
        sunday: Joi.string().optional()
    }).optional()
});

// Validation middleware functions
const validateRestaurantQuery = (req, res, next) => {
    const { error, value } = restaurantQuerySchema.validate(req.query, {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: true
    });

    if (error) {
        const details = error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message,
            value: detail.context?.value
        }));

        return res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Invalid query parameters',
                details
            }
        });
    }

    // Use validated and sanitized values
    req.query = value;
    next();
};

const validateRestaurant = (req, res, next) => {
    const { error, value } = restaurantSchema.validate(req.body, {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: true
    });

    if (error) {
        const details = error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message,
            value: detail.context?.value
        }));

        return res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Invalid restaurant data',
                details
            }
        });
    }

    // Use validated and sanitized values
    req.body = value;
    next();
};

// MongoDB ObjectId validation
const validateObjectId = (req, res, next) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'INVALID_ID',
                message: 'Invalid restaurant ID format'
            }
        });
    }

    next();
};

module.exports = {
    validateRestaurantQuery,
    validateRestaurant,
    validateObjectId
};