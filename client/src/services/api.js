import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error);

        if (error.response) {
            const { status, data } = error.response;

            if (status === 404) {
                console.error('Resource not found');
            } else if (status >= 500) {
                console.error('Server error');
            }

            return Promise.reject(data || error);
        } else if (error.request) {
            console.error('Network error - please check your connection');
            return Promise.reject({ message: 'Network error' });
        }

        return Promise.reject(error);
    }
);

export const restaurantService = {
    getRestaurants: async (params = {}) => {
        const response = await api.get('/restaurants', { params });
        return response.data;
    },

    getRestaurantById: async (id) => {
        const response = await api.get(`/restaurants/${id}`);
        return response.data;
    },

    getFilterOptions: async () => {
        const response = await api.get('/restaurants/filters/options');
        return response.data;
    },
};

export const healthService = {
    checkHealth: async () => {
        const response = await api.get('/health');
        return response.data;
    },
};

export default api;