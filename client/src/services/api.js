import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error);

        // Handle common error cases
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            if (status === 404) {
                console.error('Resource not found');
            } else if (status >= 500) {
                console.error('Server error');
            }

            return Promise.reject(data || error);
        } else if (error.request) {
            // Network error
            console.error('Network error - please check your connection');
            return Promise.reject({ message: 'Network error' });
        }

        return Promise.reject(error);
    }
);

// Restaurant API methods
export const restaurantService = {
    // Get all restaurants with filters
    getRestaurants: async (params = {}) => {
        const response = await api.get('/restaurants', { params });
        return response.data;
    },

    // Get single restaurant by ID
    getRestaurantById: async (id) => {
        const response = await api.get(`/restaurants/${id}`);
        return response.data;
    },

    // Get filter options
    getFilterOptions: async () => {
        const response = await api.get('/restaurants/filters/options');
        return response.data;
    },
};

// Health check
export const healthService = {
    checkHealth: async () => {
        const response = await api.get('/health');
        return response.data;
    },
};

export default api;