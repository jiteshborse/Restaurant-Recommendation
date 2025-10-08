const express = require('express');
const {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getFilterOptions,
    getRestaurantStats
} = require('../controllers/restaurantController');

const {
    validateRestaurantQuery,
    validateRestaurant,
    validateObjectId
} = require('../middleware/validation');

const router = express.Router();

router.get('/filters/options', getFilterOptions);
router.get('/stats', getRestaurantStats);
router.get('/', validateRestaurantQuery, getAllRestaurants);
router.get('/:id', validateObjectId, getRestaurantById);
router.post('/', validateRestaurant, createRestaurant);
router.put('/:id', validateObjectId, validateRestaurant, updateRestaurant);
router.delete('/:id', validateObjectId, deleteRestaurant);

module.exports = router;