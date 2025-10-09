// server/seed/seed.js
const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const restaurantData = require('./seedData');
require('dotenv').config();

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant-app';

        await mongoose.connect(MONGODB_URI);

        console.log('📊 Connected to MongoDB');

        // Clear existing data
        await Restaurant.deleteMany({});
        console.log('🗑️  Cleared existing restaurants');

        // Insert seed data
        const restaurants = await Restaurant.insertMany(restaurantData);
        console.log(`🌱 Seeded ${restaurants.length} restaurants successfully`);

        // Display summary
        const summary = await Restaurant.aggregate([
            { $group: { _id: '$location', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        console.log('\n📊 Restaurants by location:');
        summary.forEach(item => {
            console.log(`   ${item._id}: ${item.count} restaurants`);
        });

        const cuisineSummary = await Restaurant.aggregate([
            { $unwind: '$cuisines' },
            { $group: { _id: '$cuisines', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        console.log('\n🍽️  Restaurants by cuisine:');
        cuisineSummary.forEach(item => {
            console.log(`   ${item._id}: ${item.count} restaurants`);
        });

        const ratingStats = await Restaurant.aggregate([
            {
                $group: {
                    _id: null,
                    avgRating: { $avg: '$rating' },
                    minRating: { $min: '$rating' },
                    maxRating: { $max: '$rating' }
                }
            }
        ]);

        console.log('\n⭐ Rating statistics:');
        console.log(`   Average: ${ratingStats[0].avgRating.toFixed(2)}`);
        console.log(`   Minimum: ${ratingStats[0].minRating}`);
        console.log(`   Maximum: ${ratingStats[0].maxRating}`);

        console.log('\n✅ Database seeding completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

// Run if called directly
if (require.main === module) {
    seedDatabase();
}

module.exports = { seedDatabase, restaurantData };