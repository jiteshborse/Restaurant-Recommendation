import React from "react";
import { Link } from "react-router-dom";
import {
  SparklesIcon,
  MagnifyingGlassIcon,
  StarIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  HeartIcon,
  CheckCircleIcon,
  UserGroupIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

const About = () => {
  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: "Smart Search",
      description:
        "Find restaurants by name, cuisine, or location with intelligent filtering",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: StarIcon,
      title: "Rating System",
      description: "Browse restaurants by ratings and authentic user reviews",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: CurrencyDollarIcon,
      title: "Price Filtering",
      description: "Filter by budget from $ to $$$$ to match your preferences",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: MapPinIcon,
      title: "Location Based",
      description:
        "Discover restaurants near you with precise location mapping",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: HeartIcon,
      title: "Personalized",
      description:
        "Save favorites and get recommendations tailored to your taste",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: SparklesIcon,
      title: "Curated Selection",
      description:
        "Hand-picked restaurants ensuring quality dining experiences",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const teamMembers = [
    {
      name: "Nitin Govardhane",
      role: "Full Stack Developer",
      description:
        "Expert in building scalable web applications and crafting beautiful user interfaces.",
      icon: "👨‍💻",
    },
    {
      name: "Jitesh Borse",
      role: "Full Stack Developer",
      description:
        "Passionate about creating seamless user experiences and robust backend solutions.",
      icon: "👨‍💼",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden mb-12">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

        <div className="relative z-10">
          <div className="hero-gradient rounded-3xl p-12 md:p-16 text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-75"></div>
                <div className="relative p-4 bg-white/10 backdrop-blur-sm rounded-2xl animate-float">
                  <SparklesIcon className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-black text-white mb-4 text-shadow tracking-tight leading-tight">
              About
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent animate-pulse-slow">
                FoodieFind
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed font-light">
              Discover amazing restaurants tailored to your taste with our
              intelligent recommendation system
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="card p-8 hover:shadow-2xl group">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
              <HeartIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-black gradient-text">Our Mission</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            We help food lovers discover exceptional dining experiences by
            providing personalized restaurant recommendations based on location,
            cuisine preferences, ratings, and budget. Our goal is to make every
            meal memorable and accessible to everyone.
          </p>
        </div>

        <div className="card p-8 hover:shadow-2xl group">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
              <LightBulbIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-black gradient-text">Our Vision</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            To become the go-to platform for restaurant discovery, empowering
            food enthusiasts to explore diverse cuisines and find their perfect
            dining destination. We believe that great food brings people
            together.
          </p>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="card p-8 mb-12 hover:shadow-2xl">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl mr-4">
            <CheckCircleIcon className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-black gradient-text">What We Offer</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <ul className="text-gray-600 text-lg space-y-4">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span>
                <strong>Smart Filtering:</strong> Search restaurants by cuisine,
                location, price, and ratings
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span>
                <strong>Real Reviews:</strong> Authentic ratings and detailed
                customer feedback
              </span>
            </li>
          </ul>
          <ul className="text-gray-600 text-lg space-y-4">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span>
                <strong>Location Maps:</strong> Find restaurants near you
                instantly
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span>
                <strong>Diverse Cuisine:</strong> Explore 12+ cuisine types and
                styles
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Features Section */}
      <div className="card p-8 mb-12 hover:shadow-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black gradient-text mb-4">
            Key Features
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover what makes FoodieFind the perfect companion for your
            culinary adventures
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`inline-flex p-4 bg-gradient-to-r ${feature.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members Section */}
      <div className="mb-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl mb-4">
            <UserGroupIcon className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-4xl font-black gradient-text mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Passionate developers dedicated to creating exceptional dining
            experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="card p-8 hover:shadow-2xl group">
              <div className="text-center">
                <div className="text-6xl mb-4">{member.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-4"></div>
                <p className="text-purple-600 font-semibold text-lg mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
                <div className="mt-6 flex justify-center space-x-3">
                  <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                    Full Stack
                  </div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                    React/Node
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="card-glass p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            Ready to Explore?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of food lovers who trust FoodieFind to discover their
            next favorite restaurant
          </p>
          <Link
            to="/"
            className="btn-primary text-lg px-8 py-4 animate-glow inline-block shadow-xl"
          >
            Start Discovering Restaurants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
