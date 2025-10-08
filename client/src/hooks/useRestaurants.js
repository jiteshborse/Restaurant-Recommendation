// client/src/hooks/useRestaurants.js
import { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';

/**
 * Custom hook to access restaurant context
 * Must be used within RestaurantProvider
 * 
 * @returns {Object} Restaurant context value with state and actions
 * 
 * @example
 * const { restaurants, loading, loadRestaurants, setFilter } = useRestaurants();
 */
export const useRestaurants = () => {
    const context = useContext(RestaurantContext);

    if (context === undefined) {
        throw new Error('useRestaurants must be used within a RestaurantProvider');
    }

    return context;
};

export default useRestaurants;