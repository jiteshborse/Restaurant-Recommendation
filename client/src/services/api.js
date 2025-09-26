// Mock data for development
const mockRestaurants = [
    {
        id: '1',
        name: 'The Golden Spoon',
        cuisine: 'Italian',
        location: 'Downtown',
        rating: 4.5,
        priceRange: '$$',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
        description: 'Authentic Italian cuisine with a modern twist',
        phone: '(555) 123-4567',
        address: '123 Main St, Downtown'
    },
    {
        id: '2',
        name: 'Spice Garden',
        cuisine: 'Indian',
        location: 'Midtown',
        rating: 4.2,
        priceRange: '$',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
        description: 'Traditional Indian flavors and spices',
        phone: '(555) 234-5678',
        address: '456 Oak Ave, Midtown'
    },
    {
        id: '3',
        name: 'Ocean Breeze',
        cuisine: 'Seafood',
        location: 'Waterfront',
        rating: 4.8,
        priceRange: '$$$',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
        description: 'Fresh seafood with ocean views',
        phone: '(555) 345-6789',
        address: '789 Harbor Blvd, Waterfront'
    },
    {
        id: '4',
        name: 'Burger Palace',
        cuisine: 'American',
        location: 'Downtown',
        rating: 4.0,
        priceRange: '$',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        description: 'Gourmet burgers and classic American fare',
        phone: '(555) 456-7890',
        address: '321 Elm St, Downtown'
    },
    {
        id: '5',
        name: 'Sakura Sushi',
        cuisine: 'Japanese',
        location: 'Uptown',
        rating: 4.6,
        priceRange: '$$',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
        description: 'Fresh sushi and traditional Japanese dishes',
        phone: '(555) 567-8901',
        address: '654 Pine St, Uptown'
    }
];

const mockFilterOptions = {
    locations: ['Downtown', 'Midtown', 'Uptown', 'Waterfront'],
    cuisines: ['Italian', 'Indian', 'Seafood', 'American', 'Japanese', 'Mexican', 'Chinese'],
    priceRanges: ['$', '$$', '$$$', '$$$$']
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Restaurant API methods with mock data
export const restaurantService = {
    // Get all restaurants with filters
    getRestaurants: async (params = {}) => {
        await delay(500); // Simulate network delay
        
        let filteredRestaurants = [...mockRestaurants];
        
        // Apply filters
        if (params.search) {
            const searchTerm = params.search.toLowerCase();
            filteredRestaurants = filteredRestaurants.filter(restaurant => 
                restaurant.name.toLowerCase().includes(searchTerm) ||
                restaurant.cuisine.toLowerCase().includes(searchTerm) ||
                restaurant.description.toLowerCase().includes(searchTerm)
            );
        }
        
        if (params.location) {
            filteredRestaurants = filteredRestaurants.filter(restaurant => 
                restaurant.location === params.location
            );
        }
        
        if (params.cuisines) {
            const cuisineList = params.cuisines.split(',');
            filteredRestaurants = filteredRestaurants.filter(restaurant => 
                cuisineList.includes(restaurant.cuisine)
            );
        }
        
        if (params.minRating) {
            filteredRestaurants = filteredRestaurants.filter(restaurant => 
                restaurant.rating >= parseFloat(params.minRating)
            );
        }
        
        // Apply sorting
        if (params.sort) {
            const sortOrder = params.sortOrder === 'asc' ? 1 : -1;
            filteredRestaurants.sort((a, b) => {
                if (params.sort === 'rating') {
                    return (a.rating - b.rating) * sortOrder;
                } else if (params.sort === 'name') {
                    return a.name.localeCompare(b.name) * sortOrder;
                }
                return 0;
            });
        }
        
        // Apply pagination
        const page = parseInt(params.page) || 1;
        const limit = parseInt(params.limit) || 20;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedRestaurants = filteredRestaurants.slice(startIndex, endIndex);
        
        const totalCount = filteredRestaurants.length;
        const totalPages = Math.ceil(totalCount / limit);
        
        return {
            data: {
                restaurants: paginatedRestaurants,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalCount,
                    limit,
                    hasNext: page < totalPages,
                    hasPrev: page > 1
                }
            }
        };
    },

    // Get single restaurant by ID
    getRestaurantById: async (id) => {
        await delay(300);
        
        const restaurant = mockRestaurants.find(r => r.id === id);
        
        if (!restaurant) {
            throw new Error('Restaurant not found');
        }
        
        return {
            data: {
                restaurant
            }
        };
    },

    // Get filter options
    getFilterOptions: async () => {
        await delay(200);
        
        return {
            data: mockFilterOptions
        };
    },
};

// Health check
export const healthService = {
    checkHealth: async () => {
        await delay(100);
        return {
            data: {
                status: 'OK',
                message: 'Mock API is running'
            }
        };
    },
};

export default { restaurantService, healthService };