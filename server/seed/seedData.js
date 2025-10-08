// server/seed/seedData.js

const restaurantData = [
    {
        name: "Mama's Italian Kitchen",
        location: "Downtown",
        cuisines: ["Italian"],
        rating: 4.5,
        address: {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001"
        },
        phone: "(555) 123-4567",
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
        priceRange: "$$",
        description: "Authentic Italian cuisine with homemade pasta and traditional recipes passed down through generations.",
        hours: {
            monday: "11:00 AM - 10:00 PM",
            tuesday: "11:00 AM - 10:00 PM",
            wednesday: "11:00 AM - 10:00 PM",
            thursday: "11:00 AM - 10:00 PM",
            friday: "11:00 AM - 11:00 PM",
            saturday: "11:00 AM - 11:00 PM",
            sunday: "12:00 PM - 9:00 PM"
        }
    },
    {
        name: "Dragon Palace",
        location: "Chinatown",
        cuisines: ["Chinese"],
        rating: 4.2,
        address: {
            street: "456 Canal St",
            city: "New York",
            state: "NY",
            zipCode: "10013"
        },
        phone: "(555) 234-5678",
        imageUrl: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400",
        priceRange: "$",
        description: "Traditional Chinese dishes with fresh ingredients and authentic flavors in a cozy atmosphere.",
        hours: {
            monday: "11:30 AM - 9:30 PM",
            tuesday: "11:30 AM - 9:30 PM",
            wednesday: "11:30 AM - 9:30 PM",
            thursday: "11:30 AM - 9:30 PM",
            friday: "11:30 AM - 10:30 PM",
            saturday: "11:30 AM - 10:30 PM",
            sunday: "12:00 PM - 9:00 PM"
        }
    },
    {
        name: "Spice Garden",
        location: "Midtown",
        cuisines: ["Indian", "Thai"],
        rating: 4.7,
        address: {
            street: "789 Broadway",
            city: "New York",
            state: "NY",
            zipCode: "10003"
        },
        phone: "(555) 345-6789",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
        priceRange: "$$",
        description: "Fusion of Indian and Thai cuisines with aromatic spices and fresh herbs.",
        hours: {
            monday: "12:00 PM - 10:00 PM",
            tuesday: "12:00 PM - 10:00 PM",
            wednesday: "12:00 PM - 10:00 PM",
            thursday: "12:00 PM - 10:00 PM",
            friday: "12:00 PM - 11:00 PM",
            saturday: "12:00 PM - 11:00 PM",
            sunday: "1:00 PM - 9:00 PM"
        }
    },
    {
        name: "El Mariachi Loco",
        location: "Brooklyn",
        cuisines: ["Mexican"],
        rating: 4.1,
        address: {
            street: "321 Fifth Ave",
            city: "Brooklyn",
            state: "NY",
            zipCode: "11215"
        },
        phone: "(555) 456-7890",
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
        priceRange: "$",
        description: "Vibrant Mexican cantina serving authentic tacos, burritos, and margaritas.",
        hours: {
            monday: "11:00 AM - 10:00 PM",
            tuesday: "11:00 AM - 10:00 PM",
            wednesday: "11:00 AM - 10:00 PM",
            thursday: "11:00 AM - 10:00 PM",
            friday: "11:00 AM - 12:00 AM",
            saturday: "11:00 AM - 12:00 AM",
            sunday: "11:00 AM - 10:00 PM"
        }
    },
    {
        name: "The Steakhouse Prime",
        location: "Upper East Side",
        cuisines: ["American"],
        rating: 4.8,
        address: {
            street: "654 Park Ave",
            city: "New York",
            state: "NY",
            zipCode: "10065"
        },
        phone: "(555) 567-8901",
        imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
        priceRange: "$$$$",
        description: "Premium steakhouse offering the finest cuts of beef and extensive wine selection.",
        hours: {
            monday: "5:00 PM - 11:00 PM",
            tuesday: "5:00 PM - 11:00 PM",
            wednesday: "5:00 PM - 11:00 PM",
            thursday: "5:00 PM - 11:00 PM",
            friday: "5:00 PM - 12:00 AM",
            saturday: "5:00 PM - 12:00 AM",
            sunday: "4:00 PM - 10:00 PM"
        }
    },
    {
        name: "Sakura Sushi Bar",
        location: "Queens",
        cuisines: ["Japanese"],
        rating: 4.4,
        address: {
            street: "987 Northern Blvd",
            city: "Queens",
            state: "NY",
            zipCode: "11354"
        },
        phone: "(555) 678-9012",
        imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400",
        priceRange: "$$$",
        description: "Fresh sushi and traditional Japanese dishes in an elegant setting.",
        hours: {
            monday: "Closed",
            tuesday: "12:00 PM - 9:00 PM",
            wednesday: "12:00 PM - 9:00 PM",
            thursday: "12:00 PM - 9:00 PM",
            friday: "12:00 PM - 10:00 PM",
            saturday: "12:00 PM - 10:00 PM",
            sunday: "1:00 PM - 9:00 PM"
        }
    },
    {
        name: "Mediterranean Breeze",
        location: "Greenwich Village",
        cuisines: ["Mediterranean", "Greek"],
        rating: 4.3,
        address: {
            street: "147 Bleecker St",
            city: "New York",
            state: "NY",
            zipCode: "10012"
        },
        phone: "(555) 789-0123",
        imageUrl: "https://images.unsplash.com/photo-1544510806-4e113a00b333?w=400",
        priceRange: "$$",
        description: "Mediterranean flavors with fresh seafood, grilled meats, and traditional Greek dishes.",
        hours: {
            monday: "11:30 AM - 10:00 PM",
            tuesday: "11:30 AM - 10:00 PM",
            wednesday: "11:30 AM - 10:00 PM",
            thursday: "11:30 AM - 10:00 PM",
            friday: "11:30 AM - 11:00 PM",
            saturday: "11:30 AM - 11:00 PM",
            sunday: "12:00 PM - 10:00 PM"
        }
    },
    {
        name: "Seoul Kitchen",
        location: "Koreatown",
        cuisines: ["Korean"],
        rating: 4.6,
        address: {
            street: "258 W 32nd St",
            city: "New York",
            state: "NY",
            zipCode: "10001"
        },
        phone: "(555) 890-1234",
        imageUrl: "https://images.unsplash.com/photo-1567223075119-ad7ceede5c2f?w=400",
        priceRange: "$$",
        description: "Authentic Korean BBQ and traditional dishes in the heart of Koreatown.",
        hours: {
            monday: "11:00 AM - 11:00 PM",
            tuesday: "11:00 AM - 11:00 PM",
            wednesday: "11:00 AM - 11:00 PM",
            thursday: "11:00 AM - 11:00 PM",
            friday: "11:00 AM - 12:00 AM",
            saturday: "11:00 AM - 12:00 AM",
            sunday: "11:00 AM - 11:00 PM"
        }
    },
    {
        name: "Pho Saigon",
        location: "Lower East Side",
        cuisines: ["Vietnamese"],
        rating: 4.0,
        address: {
            street: "369 Grand St",
            city: "New York",
            state: "NY",
            zipCode: "10002"
        },
        phone: "(555) 901-2345",
        imageUrl: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400",
        priceRange: "$",
        description: "Traditional Vietnamese pho and fresh spring rolls in a casual, friendly atmosphere.",
        hours: {
            monday: "10:00 AM - 9:00 PM",
            tuesday: "10:00 AM - 9:00 PM",
            wednesday: "10:00 AM - 9:00 PM",
            thursday: "10:00 AM - 9:00 PM",
            friday: "10:00 AM - 10:00 PM",
            saturday: "10:00 AM - 10:00 PM",
            sunday: "11:00 AM - 9:00 PM"
        }
    },
    {
        name: "Café Montmartre",
        location: "SoHo",
        cuisines: ["French"],
        rating: 4.9,
        address: {
            street: "482 Spring St",
            city: "New York",
            state: "NY",
            zipCode: "10012"
        },
        phone: "(555) 012-3456",
        imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
        priceRange: "$$$",
        description: "Elegant French bistro offering classic dishes and an extensive wine collection.",
        hours: {
            monday: "Closed",
            tuesday: "12:00 PM - 10:00 PM",
            wednesday: "12:00 PM - 10:00 PM",
            thursday: "12:00 PM - 10:00 PM",
            friday: "12:00 PM - 11:00 PM",
            saturday: "11:00 AM - 11:00 PM",
            sunday: "11:00 AM - 9:00 PM"
        }
    },
    // Additional restaurants for better testing
    {
        name: "Pizza Corner",
        location: "Downtown",
        cuisines: ["Italian", "American"],
        rating: 3.8,
        address: {
            street: "555 Broadway",
            city: "New York",
            state: "NY",
            zipCode: "10012"
        },
        phone: "(555) 111-2222",
        imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
        priceRange: "$",
        description: "New York style pizza and casual Italian-American fare.",
        hours: {
            monday: "11:00 AM - 11:00 PM",
            tuesday: "11:00 AM - 11:00 PM",
            wednesday: "11:00 AM - 11:00 PM",
            thursday: "11:00 AM - 11:00 PM",
            friday: "11:00 AM - 12:00 AM",
            saturday: "11:00 AM - 12:00 AM",
            sunday: "12:00 PM - 11:00 PM"
        }
    },
    {
        name: "Taco Libre",
        location: "Brooklyn",
        cuisines: ["Mexican"],
        rating: 3.9,
        address: {
            street: "777 Atlantic Ave",
            city: "Brooklyn",
            state: "NY",
            zipCode: "11238"
        },
        phone: "(555) 333-4444",
        imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400",
        priceRange: "$",
        description: "Fresh Mexican street food and creative tacos in a vibrant setting.",
        hours: {
            monday: "11:00 AM - 10:00 PM",
            tuesday: "11:00 AM - 10:00 PM",
            wednesday: "11:00 AM - 10:00 PM",
            thursday: "11:00 AM - 10:00 PM",
            friday: "11:00 AM - 11:00 PM",
            saturday: "11:00 AM - 11:00 PM",
            sunday: "12:00 PM - 10:00 PM"
        }
    },
    {
        name: "Curry House",
        location: "Midtown",
        cuisines: ["Indian"],
        rating: 4.4,
        address: {
            street: "888 Sixth Ave",
            city: "New York",
            state: "NY",
            zipCode: "10001"
        },
        phone: "(555) 555-6666",
        imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
        priceRange: "$",
        description: "Authentic Indian curry dishes with a modern twist and vegetarian options.",
        hours: {
            monday: "11:30 AM - 10:00 PM",
            tuesday: "11:30 AM - 10:00 PM",
            wednesday: "11:30 AM - 10:00 PM",
            thursday: "11:30 AM - 10:00 PM",
            friday: "11:30 AM - 10:30 PM",
            saturday: "11:30 AM - 10:30 PM",
            sunday: "12:00 PM - 10:00 PM"
        }
    },
    {
        name: "Thai Basil",
        location: "Queens",
        cuisines: ["Thai"],
        rating: 4.5,
        address: {
            street: "999 Queens Blvd",
            city: "Queens",
            state: "NY",
            zipCode: "11374"
        },
        phone: "(555) 777-8888",
        imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
        priceRange: "$",
        description: "Traditional Thai cuisine with bold flavors and fresh ingredients.",
        hours: {
            monday: "11:00 AM - 10:00 PM",
            tuesday: "11:00 AM - 10:00 PM",
            wednesday: "11:00 AM - 10:00 PM",
            thursday: "11:00 AM - 10:00 PM",
            friday: "11:00 AM - 11:00 PM",
            saturday: "11:00 AM - 11:00 PM",
            sunday: "12:00 PM - 10:00 PM"
        }
    },
    {
        name: "Burger Joint",
        location: "Downtown",
        cuisines: ["American"],
        rating: 4.0,
        address: {
            street: "246 Houston St",
            city: "New York",
            state: "NY",
            zipCode: "10014"
        },
        phone: "(555) 999-0000",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
        priceRange: "$",
        description: "Classic American burgers with premium beef and creative toppings.",
        hours: {
            monday: "11:00 AM - 11:00 PM",
            tuesday: "11:00 AM - 11:00 PM",
            wednesday: "11:00 AM - 11:00 PM",
            thursday: "11:00 AM - 11:00 PM",
            friday: "11:00 AM - 12:00 AM",
            saturday: "11:00 AM - 12:00 AM",
            sunday: "11:00 AM - 11:00 PM"
        }
    }
];

module.exports = restaurantData;