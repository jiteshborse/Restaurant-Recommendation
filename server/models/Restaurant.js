// server/models/Restaurant.js
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Restaurant name is required'],
        trim: true,
        maxLength: [100, 'Name cannot exceed 100 characters']
    },

    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
        maxLength: [50, 'Location cannot exceed 50 characters']
    },

    cuisines: [{
        type: String,
        required: true,
        enum: {
            values: [
                'Italian', 'Chinese', 'Indian', 'Mexican', 'Thai', 'Japanese',
                'American', 'French', 'Mediterranean', 'Korean', 'Vietnamese',
                'Greek', 'Spanish', 'Brazilian', 'Lebanese', 'Turkish'
            ],
            message: '{VALUE} is not a supported cuisine type'
        }
    }],

    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5'],
        validate: {
            validator: function (v) {
                return Number.isFinite(v) && v >= 1 && v <= 5;
            },
            message: 'Rating must be a number between 1 and 5'
        }
    },

    address: {
        street: {
            type: String,
            required: [true, 'Street address is required'],
            trim: true
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true
        },
        state: {
            type: String,
            required: [true, 'State is required'],
            trim: true,
            maxLength: [50, 'State cannot exceed 50 characters']
        },
        zipCode: {
            type: String,
            required: [true, 'Zip code is required'],
            trim: true,
            match: [/^\d{5}(-\d{4})?$/, 'Please enter a valid zip code (e.g., 12345 or 12345-6789)']
        }
    },

    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^\(\d{3}\)\s\d{3}-\d{4}$/, 'Phone format must be: (123) 456-7890']
    },

    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
        trim: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+/i.test(v);
            },
            message: 'Please provide a valid image URL'
        }
    },

    priceRange: {
        type: String,
        required: [true, 'Price range is required'],
        enum: {
            values: ['$', '$$', '$$$', '$$$$'],
            message: '{VALUE} is not a valid price range. Use $, $$, $$$, or $$$$'
        }
    },

    description: {
        type: String,
        trim: true,
        maxLength: [500, 'Description cannot exceed 500 characters']
    },

    hours: {
        monday: { type: String, default: 'Closed' },
        tuesday: { type: String, default: 'Closed' },
        wednesday: { type: String, default: 'Closed' },
        thursday: { type: String, default: 'Closed' },
        friday: { type: String, default: 'Closed' },
        saturday: { type: String, default: 'Closed' },
        sunday: { type: String, default: 'Closed' }
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for full address
restaurantSchema.virtual('fullAddress').get(function () {
    if (this.address && this.address.street && this.address.city && this.address.state && this.address.zipCode) {
        return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}`;
    }
    return '';
});

// Indexes for performance
restaurantSchema.index({ location: 1, rating: -1 }); // Most common query: location filter + rating sort
restaurantSchema.index({ cuisines: 1 }); // Cuisine filtering
restaurantSchema.index({ rating: -1 }); // Rating sorting
restaurantSchema.index({ name: 'text', description: 'text' }, { // Text search
    weights: { name: 10, description: 2 },
    name: 'restaurant_text_index'
});
restaurantSchema.index({ createdAt: -1 }); // For newest restaurants
restaurantSchema.index({ isActive: 1 }); // For active restaurants filter

// Pre-save middleware to validate data
restaurantSchema.pre('save', function (next) {
    // Ensure cuisines array is not empty
    if (this.cuisines && this.cuisines.length === 0) {
        const error = new Error('At least one cuisine must be specified');
        error.name = 'ValidationError';
        return next(error);
    }

    // Round rating to 1 decimal place
    if (this.rating) {
        this.rating = Math.round(this.rating * 10) / 10;
    }

    next();
});

// Static method to get filter options
restaurantSchema.statics.getFilterOptions = async function () {
    const [locations, cuisines, priceRanges] = await Promise.all([
        this.distinct('location', { isActive: true }),
        this.distinct('cuisines', { isActive: true }),
        this.distinct('priceRange', { isActive: true })
    ]);

    return {
        locations: locations.sort(),
        cuisines: cuisines.sort(),
        priceRanges: priceRanges.sort()
    };
};

// Instance method to toggle active status
restaurantSchema.methods.toggleActive = function () {
    this.isActive = !this.isActive;
    return this.save();
};

// Error handling for duplicate key errors
restaurantSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('A restaurant with this name already exists'));
    } else {
        next(error);
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);