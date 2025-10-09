import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, MagnifyingGlassIcon, StarIcon, CurrencyDollarIcon, MapPinIcon, HeartIcon } from '@heroicons/react/24/outline';

const About = () => {
    const features = [
        {
            icon: MagnifyingGlassIcon,
            title: 'Smart Search',
            description: 'Find restaurants by name, cuisine, or location with intelligent filtering',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: StarIcon,
            title: 'Rating System',
            description: 'Browse restaurants by ratings and authentic user reviews',
            color: 'from-yellow-500 to-orange-500'
        },
        {
            icon: CurrencyDollarIcon,
            title: 'Price Filtering',
            description: 'Filter by budget from $ to $$$$ to match your preferences',
            color: 'from-green-500 to-teal-500'
        },
        {
            icon: MapPinIcon,
            title: 'Location Based',
            description: 'Discover restaurants near you with precise location mapping',
            color: 'from-blue-500 to-indigo-500'
        },
        {
            icon: HeartIcon,
            title: 'Personalized',
            description: 'Save favorites and get recommendations tailored to your taste',
            color: 'from-red-500 to-pink-500'
        },
        {
            icon: SparklesIcon,
            title: 'Curated Selection',
            description: 'Hand-picked restaurants ensuring quality dining experiences',
            color: 'from-indigo-500 to-purple-500'
        }
    ];

    return (
        <div className="min-h-screen">
            <div className="hero-gradient rounded-3xl p-8 mb-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl"></div>
                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl animate-float">
                            <SparklesIcon className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6 text-shadow tracking-tight">
                        About
                        <span className="block gradient-text bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            FoodieFind
                        </span>
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                        Discover amazing restaurants tailored to your taste with our intelligent recommendation system
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <div className="card p-8">
                    <div className="flex items-center mb-6">
                        <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl mr-4">
                            <HeartIcon className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-black gradient-text">Our Mission</h2>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        We help food lovers discover exceptional dining experiences by providing 
                        personalized restaurant recommendations based on location, cuisine preferences, 
                        ratings, and budget. Our goal is to make every meal memorable.
                    </p>
                </div>

                <div className="card p-8">
                    <div className="flex items-center mb-6">
                        <div className="p-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl mr-4">
                            <SparklesIcon className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-black gradient-text">What We Offer</h2>
                    </div>
                    <ul className="text-gray-600 text-lg space-y-3">
                        <li className="flex items-center">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mr-3"></div>
                            Smart restaurant filtering and search
                        </li>
                        <li className="flex items-center">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mr-3"></div>
                            Real-time ratings and authentic reviews
                        </li>
                        <li className="flex items-center">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mr-3"></div>
                            Location-based recommendations
                        </li>
                        <li className="flex items-center">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mr-3"></div>
                            Diverse cuisine exploration
                        </li>
                    </ul>
                </div>
            </div>

            <div className="card p-8 mb-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black gradient-text mb-4">Features</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover what makes FoodieFind the perfect companion for your culinary adventures
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                            <div className={`inline-flex p-4 bg-gradient-to-r ${feature.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card-glass p-8 text-center">
                <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Ready to Explore?</h2>
                <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
                    Join thousands of food lovers who trust FoodieFind to discover their next favorite restaurant
                </p>
                <Link to="/" className="btn-primary text-lg px-8 py-4 animate-glow inline-block">
                    Start Discovering
                </Link>
            </div>
        </div>
    );
};

export default About;