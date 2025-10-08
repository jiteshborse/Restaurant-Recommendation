import React, { createContext, useReducer, useCallback } from 'react';
import { restaurantService } from '../services/api';

const initialState = {
    restaurants: [],
    currentRestaurant: null,
    filterOptions: {
        locations: [],
        cuisines: [],
        priceRanges: []
    },
    filters: {
        location: '',
        cuisines: [],
        minRating: null,
        search: ''
    },
    pagination: {
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        limit: 20,
        hasNext: false,
        hasPrev: false
    },
    loading: false,
    error: null,
    sort: {
        field: 'rating',
        order: 'desc'
    }
};

const ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
    SET_RESTAURANTS: 'SET_RESTAURANTS',
    SET_CURRENT_RESTAURANT: 'SET_CURRENT_RESTAURANT',
    SET_FILTER_OPTIONS: 'SET_FILTER_OPTIONS',
    SET_FILTER: 'SET_FILTER',
    CLEAR_FILTER: 'CLEAR_FILTER',
    CLEAR_ALL_FILTERS: 'CLEAR_ALL_FILTERS',
    SET_PAGINATION: 'SET_PAGINATION',
    SET_SORT: 'SET_SORT'
};

const restaurantReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };

        case ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };

        case ACTIONS.SET_RESTAURANTS:
            return {
                ...state,
                restaurants: action.payload,
                loading: false,
                error: null
            };

        case ACTIONS.SET_CURRENT_RESTAURANT:
            return {
                ...state,
                currentRestaurant: action.payload,
                loading: false,
                error: null
            };

        case ACTIONS.SET_FILTER_OPTIONS:
            return {
                ...state,
                filterOptions: action.payload
            };

        case ACTIONS.SET_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.key]: action.payload.value
                },
                pagination: {
                    ...state.pagination,
                    currentPage: 1
                }
            };

        case ACTIONS.CLEAR_FILTER:
            const newFilters = { ...state.filters };
            if (action.payload === 'cuisines') {
                newFilters[action.payload] = [];
            } else if (action.payload === 'minRating') {
                newFilters[action.payload] = null;
            } else {
                newFilters[action.payload] = '';
            }

            return {
                ...state,
                filters: newFilters,
                pagination: {
                    ...state.pagination,
                    currentPage: 1
                }
            };

        case ACTIONS.CLEAR_ALL_FILTERS:
            return {
                ...state,
                filters: initialState.filters,
                pagination: {
                    ...state.pagination,
                    currentPage: 1
                }
            };

        case ACTIONS.SET_PAGINATION:
            return {
                ...state,
                pagination: action.payload
            };

        case ACTIONS.SET_SORT:
            return {
                ...state,
                sort: action.payload,
                pagination: {
                    ...state.pagination,
                    currentPage: 1
                }
            };

        default:
            return state;
    }
};

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
    const [state, dispatch] = useReducer(restaurantReducer, initialState);

    const loadRestaurants = useCallback(async () => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            dispatch({ type: ACTIONS.CLEAR_ERROR });

            const params = {
                ...state.filters,
                page: state.pagination.currentPage,
                limit: state.pagination.limit,
                sort: state.sort.field,
                sortOrder: state.sort.order
            };

            Object.keys(params).forEach(key => {
                if (params[key] === '' || params[key] === null ||
                    (Array.isArray(params[key]) && params[key].length === 0)) {
                    delete params[key];
                }
            });

            if (params.cuisines && Array.isArray(params.cuisines)) {
                params.cuisines = params.cuisines.join(',');
            }

            const response = await restaurantService.getRestaurants(params);

            dispatch({ type: ACTIONS.SET_RESTAURANTS, payload: response.data.restaurants });
            dispatch({ type: ACTIONS.SET_PAGINATION, payload: response.data.pagination });

        } catch (error) {
            dispatch({
                type: ACTIONS.SET_ERROR,
                payload: error.error || { message: 'Failed to load restaurants' }
            });
        }
    }, [state.filters, state.pagination.currentPage, state.pagination.limit, state.sort]);

    const loadRestaurant = useCallback(async (id) => {
        try {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            dispatch({ type: ACTIONS.CLEAR_ERROR });

            const response = await restaurantService.getRestaurantById(id);
            dispatch({ type: ACTIONS.SET_CURRENT_RESTAURANT, payload: response.data.restaurant });

        } catch (error) {
            dispatch({
                type: ACTIONS.SET_ERROR,
                payload: error.error || { message: 'Failed to load restaurant' }
            });
        }
    }, []);

    const loadFilterOptions = useCallback(async () => {
        try {
            const response = await restaurantService.getFilterOptions();
            dispatch({ type: ACTIONS.SET_FILTER_OPTIONS, payload: response.data });
        } catch (error) {
            console.error('Failed to load filter options:', error);
        }
    }, []);

    const setFilter = useCallback((key, value) => {
        dispatch({
            type: ACTIONS.SET_FILTER,
            payload: { key, value }
        });
    }, []);

    const clearFilter = useCallback((key) => {
        dispatch({ type: ACTIONS.CLEAR_FILTER, payload: key });
    }, []);

    const clearAllFilters = useCallback(() => {
        dispatch({ type: ACTIONS.CLEAR_ALL_FILTERS });
    }, []);

    const setPage = useCallback((page) => {
        dispatch({
            type: ACTIONS.SET_PAGINATION,
            payload: { ...state.pagination, currentPage: page }
        });
    }, [state.pagination]);

    const setSort = useCallback((field, order = 'desc') => {
        dispatch({
            type: ACTIONS.SET_SORT,
            payload: { field, order }
        });
    }, []);

    const hasActiveFilters = Object.values(state.filters).some(value => {
        if (Array.isArray(value)) return value.length > 0;
        return value !== null && value !== '';
    });

    const isEmpty = state.restaurants.length === 0 && !state.loading;

    const contextValue = {
        ...state,
        hasActiveFilters,
        isEmpty,
        loadRestaurants,
        loadRestaurant,
        loadFilterOptions,
        setFilter,
        clearFilter,
        clearAllFilters,
        setPage,
        setSort
    };

    return (
        <RestaurantContext.Provider value={contextValue}>
            {children}
        </RestaurantContext.Provider>
    );
};

export default RestaurantContext;