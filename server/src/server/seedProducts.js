const Product = require('../models/products/products'); 

const seedProducts = async () => {
    try {
        const productCount = await Product.countDocuments();
        if (productCount > 0) {
            console.log('Products already exist. Skipping seeding...');
            return;
        }

        const sampleProducts = [
            {
                timeStamp: new Date().toISOString(),
                name: "Smartphone X",
                description: "Flagship phone with cutting-edge technology",
                code: "SPX123",
                category: "Electronics",
                photos: [{ url: "https://res.cloudinary.com/organicstall/image/upload/v1739317139/xrqvqg4iupayickqrffj.png", id: "spx1" }],
                price: 799,
                stock: 50,
            },
            {
                timeStamp: new Date().toISOString(),
                name: "Laptop Pro",
                description: "Powerful laptop for professionals",
                code: "LP456",
                category: "Electronics",
                photos: [{ url: "https://res.cloudinary.com/organicstall/image/upload/v1739317139/xrqvqg4iupayickqrffj.png", id: "lp1" }],
                price: 1299,
                stock: 30,
            },
            {
                timeStamp: new Date().toISOString(),
                name: "Wireless Earbuds",
                description: "Noise-canceling wireless earbuds",
                code: "WE789",
                category: "Accessories",
                photos: [{ url: "https://res.cloudinary.com/organicstall/image/upload/v1739317139/xrqvqg4iupayickqrffj.png", id: "we1" }],
                price: 199,
                stock: 100,
            },
            {
                timeStamp: new Date().toISOString(),
                name: "Gaming Monitor",
                description: "High refresh rate gaming monitor",
                code: "GM101",
                category: "Electronics",
                photos: [{ url: "https://res.cloudinary.com/organicstall/image/upload/v1739317139/xrqvqg4iupayickqrffj.png", id: "gm1" }],
                price: 599,
                stock: 20,
            },
            {
                timeStamp: new Date().toISOString(),
                name: "Mechanical Keyboard",
                description: "RGB mechanical keyboard for gaming",
                code: "MK202",
                category: "Accessories",
                photos: [{ url: "https://res.cloudinary.com/organicstall/image/upload/v1739317139/xrqvqg4iupayickqrffj.png", id: "mk1" }],
                price: 149,
                stock: 75,
            },
            {
                timeStamp: new Date().toISOString(),
                name: "Smart Watch",
                description: "Feature-packed smartwatch for fitness tracking",
                code: "SW303",
                category: "Wearables",
                photos: [{ url: "https://res.cloudinary.com/organicstall/image/upload/v1739317139/xrqvqg4iupayickqrffj.pngg", id: "sw1" }],
                price: 349,
                stock: 40,
            },
            {
                timeStamp: new Date().toISOString(),
                name: "Portable Speaker",
                description: "Bluetooth speaker with rich sound quality",
                code: "PS404",
                category: "Audio",
                photos: [{ url: "https://res.cloudinary.com/organicstall/image/upload/v1739317139/xrqvqg4iupayickqrffj.png", id: "ps1" }],
                price: 129,
                stock: 60,
            },
            {
                timeStamp: new Date().toISOString(),
                name: "VR Headset",
                description: "Immersive virtual reality gaming headset",
                code: "VR505",
                category: "Gaming",
                photos: [{ url: "https://res.cloudinary.com/organicstall/image/upload/v1739317139/xrqvqg4iupayickqrffj.png", id: "vr1" }],
                price: 499,
                stock: 15,
            },
            {
                timeStamp: new Date().toISOString(),
                name: "Drone Pro",
                description: "Advanced drone with HD camera",
                code: "DP606",
                category: "Drones",
                photos: [{ url: "https://res.cloudinary.com/organicstall/image/upload/v1739317139/xrqvqg4iupayickqrffj.png", id: "dp1" }],
                price: 899,
                stock: 10,
            },
            {
                timeStamp: new Date().toISOString(),
                name: "4K Action Camera",
                description: "Waterproof action camera for adventures",
                code: "AC707",
                category: "Cameras",
                photos: [{ url: "https://res.cloudinary.com/organicstall/image/upload/v1739317139/xrqvqg4iupayickqrffj.png", id: "ac1" }],
                price: 399,
                stock: 25,
            }
        ];

        await Product.insertMany(sampleProducts);
        console.log('Sample products seeded successfully!');
    } catch (error) {
        console.error('Error seeding products:', error);
    }
};

module.exports = seedProducts;

