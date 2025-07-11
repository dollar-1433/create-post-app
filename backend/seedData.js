const mongoose = require('mongoose');
require('dotenv').config();

const Country = require('./models/Country');
const Place = require('./models/Place');
const User = require('./models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Country.deleteMany({});
    await Place.deleteMany({});
    
    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@tourist.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@tourist.com',
        password: 'admin123',
        age: 30,
        role: 'admin'
      });
      console.log('Admin user created');
    }

    // Countries data
    const countries = [
      {
        name: 'India',
        code: 'IN',
        flag: 'https://images.pexels.com/photos/3532557/pexels-photo-3532557.jpeg',
        description: 'Land of diverse cultures, ancient traditions, and incredible monuments.',
        coordinates: { lat: 20.5937, lng: 78.9629 },
        currency: 'Indian Rupee',
        language: 'Hindi, English',
        timezone: 'IST'
      },
      {
        name: 'Japan',
        code: 'JP',
        flag: 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-161401.jpeg',
        description: 'Land of the rising sun, blending ancient traditions with modern technology.',
        coordinates: { lat: 36.2048, lng: 138.2529 },
        currency: 'Japanese Yen',
        language: 'Japanese',
        timezone: 'JST'
      },
      {
        name: 'France',
        code: 'FR',
        flag: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
        description: 'Country of romance, art, fashion, and exquisite cuisine.',
        coordinates: { lat: 46.6034, lng: 1.8883 },
        currency: 'Euro',
        language: 'French',
        timezone: 'CET'
      },
      {
        name: 'Italy',
        code: 'IT',
        flag: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg',
        description: 'Home to ancient Roman history, Renaissance art, and delicious cuisine.',
        coordinates: { lat: 41.8719, lng: 12.5674 },
        currency: 'Euro',
        language: 'Italian',
        timezone: 'CET'
      },
      {
        name: 'United States',
        code: 'US',
        flag: 'https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg',
        description: 'Land of opportunity with diverse landscapes and vibrant cities.',
        coordinates: { lat: 37.0902, lng: -95.7129 },
        currency: 'US Dollar',
        language: 'English',
        timezone: 'Multiple'
      },
      {
        name: 'Brazil',
        code: 'BR',
        flag: 'https://images.pexels.com/photos/351283/pexels-photo-351283.jpeg',
        description: 'Country of carnival, football, Amazon rainforest, and beautiful beaches.',
        coordinates: { lat: -14.2350, lng: -51.9253 },
        currency: 'Brazilian Real',
        language: 'Portuguese',
        timezone: 'BRT'
      },
      {
        name: 'Egypt',
        code: 'EG',
        flag: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg',
        description: 'Land of pharaohs, pyramids, and ancient civilization.',
        coordinates: { lat: 26.0975, lng: 31.2357 },
        currency: 'Egyptian Pound',
        language: 'Arabic',
        timezone: 'EET'
      },
      {
        name: 'Australia',
        code: 'AU',
        flag: 'https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg',
        description: 'Land down under with unique wildlife and stunning landscapes.',
        coordinates: { lat: -25.2744, lng: 133.7751 },
        currency: 'Australian Dollar',
        language: 'English',
        timezone: 'Multiple'
      },
      {
        name: 'United Arab Emirates',
        code: 'AE',
        flag: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg',
        description: 'Modern oasis with luxury shopping, ultramodern architecture.',
        coordinates: { lat: 23.4241, lng: 53.8478 },
        currency: 'UAE Dirham',
        language: 'Arabic',
        timezone: 'GST'
      },
      {
        name: 'United Kingdom',
        code: 'GB',
        flag: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
        description: 'Rich history, royal heritage, and diverse cultural experiences.',
        coordinates: { lat: 55.3781, lng: -3.4360 },
        currency: 'British Pound',
        language: 'English',
        timezone: 'GMT'
      }
    ];

    const createdCountries = await Country.insertMany(countries);
    console.log('Countries seeded successfully');

    // Places data
    const places = [
      // India
      {
        name: 'Taj Mahal',
        description: 'Iconic white marble mausoleum, symbol of eternal love.',
        image: 'https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg',
        location: 'Agra, Uttar Pradesh',
        coordinates: { lat: 27.1751, lng: 78.0421 },
        country: createdCountries.find(c => c.code === 'IN')._id,
        category: 'historical',
        bestTimeToVisit: 'October to March',
        entryFee: '₹50 for Indians, ₹1100 for foreigners'
      },
      {
        name: 'Kerala Backwaters',
        description: 'Serene network of lagoons, lakes, and canals.',
        image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg',
        location: 'Alleppey, Kerala',
        coordinates: { lat: 9.4981, lng: 76.3388 },
        country: createdCountries.find(c => c.code === 'IN')._id,
        category: 'natural',
        bestTimeToVisit: 'November to February',
        entryFee: 'Varies by tour package'
      },
      {
        name: 'Golden Temple',
        description: 'Sacred Sikh shrine covered in gold.',
        image: 'https://images.pexels.com/photos/3532544/pexels-photo-3532544.jpeg',
        location: 'Amritsar, Punjab',
        coordinates: { lat: 31.6200, lng: 74.8765 },
        country: createdCountries.find(c => c.code === 'IN')._id,
        category: 'religious',
        bestTimeToVisit: 'October to March',
        entryFee: 'Free'
      },
      {
        name: 'Goa Beaches',
        description: 'Beautiful beaches with vibrant nightlife.',
        image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
        location: 'Goa',
        coordinates: { lat: 15.2993, lng: 74.1240 },
        country: createdCountries.find(c => c.code === 'IN')._id,
        category: 'natural',
        bestTimeToVisit: 'November to February',
        entryFee: 'Free'
      },
      {
        name: 'Rajasthan Palaces',
        description: 'Magnificent palaces showcasing royal heritage.',
        image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg',
        location: 'Jaipur, Rajasthan',
        coordinates: { lat: 26.9124, lng: 75.7873 },
        country: createdCountries.find(c => c.code === 'IN')._id,
        category: 'historical',
        bestTimeToVisit: 'October to March',
        entryFee: '₹200-500 per palace'
      },

      // Japan
      {
        name: 'Mount Fuji',
        description: 'Iconic sacred mountain and symbol of Japan.',
        image: 'https://images.pexels.com/photos/46253/mt-fuji-sea-of-clouds-sunrise-46253.jpeg',
        location: 'Honshu Island',
        coordinates: { lat: 35.3606, lng: 138.7274 },
        country: createdCountries.find(c => c.code === 'JP')._id,
        category: 'natural',
        bestTimeToVisit: 'July to September',
        entryFee: '¥1000 climbing fee'
      },
      {
        name: 'Fushimi Inari Shrine',
        description: 'Famous shrine with thousands of red torii gates.',
        image: 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-161401.jpeg',
        location: 'Kyoto',
        coordinates: { lat: 34.9671, lng: 135.7727 },
        country: createdCountries.find(c => c.code === 'JP')._id,
        category: 'religious',
        bestTimeToVisit: 'March to May, September to November',
        entryFee: 'Free'
      },
      {
        name: 'Tokyo Skytree',
        description: 'Tallest structure in Japan with panoramic city views.',
        image: 'https://images.pexels.com/photos/315191/pexels-photo-315191.jpeg',
        location: 'Tokyo',
        coordinates: { lat: 35.7101, lng: 139.8107 },
        country: createdCountries.find(c => c.code === 'JP')._id,
        category: 'modern',
        bestTimeToVisit: 'Year-round',
        entryFee: '¥2100-3400'
      },
      {
        name: 'Arashiyama Bamboo Grove',
        description: 'Enchanting bamboo forest creating natural tunnels.',
        image: 'https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg',
        location: 'Kyoto',
        coordinates: { lat: 35.0170, lng: 135.6761 },
        country: createdCountries.find(c => c.code === 'JP')._id,
        category: 'natural',
        bestTimeToVisit: 'April to May, October to November',
        entryFee: 'Free'
      },
      {
        name: 'Hiroshima Peace Memorial',
        description: 'Memorial dedicated to victims of atomic bombing.',
        image: 'https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg',
        location: 'Hiroshima',
        coordinates: { lat: 34.3955, lng: 132.4536 },
        country: createdCountries.find(c => c.code === 'JP')._id,
        category: 'historical',
        bestTimeToVisit: 'March to May, September to November',
        entryFee: '¥200'
      },

      // France
      {
        name: 'Eiffel Tower',
        description: 'Iconic iron lattice tower and symbol of Paris.',
        image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
        location: 'Paris',
        coordinates: { lat: 48.8584, lng: 2.2945 },
        country: createdCountries.find(c => c.code === 'FR')._id,
        category: 'historical',
        bestTimeToVisit: 'April to June, September to October',
        entryFee: '€29.40 for top floor'
      },
      {
        name: 'Louvre Museum',
        description: 'World\'s largest art museum housing Mona Lisa.',
        image: 'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg',
        location: 'Paris',
        coordinates: { lat: 48.8606, lng: 2.3376 },
        country: createdCountries.find(c => c.code === 'FR')._id,
        category: 'cultural',
        bestTimeToVisit: 'October to April',
        entryFee: '€17'
      },
      {
        name: 'Palace of Versailles',
        description: 'Opulent royal palace with magnificent gardens.',
        image: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg',
        location: 'Versailles',
        coordinates: { lat: 48.8049, lng: 2.1204 },
        country: createdCountries.find(c => c.code === 'FR')._id,
        category: 'historical',
        bestTimeToVisit: 'April to October',
        entryFee: '€20'
      },
      {
        name: 'French Riviera',
        description: 'Glamorous Mediterranean coastline.',
        image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
        location: 'Nice, Cannes',
        coordinates: { lat: 43.7102, lng: 7.2620 },
        country: createdCountries.find(c => c.code === 'FR')._id,
        category: 'natural',
        bestTimeToVisit: 'May to September',
        entryFee: 'Free beaches, paid private areas'
      },
      {
        name: 'Mont-Saint-Michel',
        description: 'Medieval abbey on a tidal island.',
        image: 'https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg',
        location: 'Normandy',
        coordinates: { lat: 48.6361, lng: -1.5115 },
        country: createdCountries.find(c => c.code === 'FR')._id,
        category: 'historical',
        bestTimeToVisit: 'April to October',
        entryFee: '€11'
      },

      // Italy
      {
        name: 'Colosseum',
        description: 'Ancient Roman amphitheater and architectural marvel.',
        image: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg',
        location: 'Rome',
        coordinates: { lat: 41.8902, lng: 12.4922 },
        country: createdCountries.find(c => c.code === 'IT')._id,
        category: 'historical',
        bestTimeToVisit: 'April to June, September to October',
        entryFee: '€16'
      },
      {
        name: 'Venice Canals',
        description: 'Romantic city built on water with gondola rides.',
        image: 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg',
        location: 'Venice',
        coordinates: { lat: 45.4408, lng: 12.3155 },
        country: createdCountries.find(c => c.code === 'IT')._id,
        category: 'cultural',
        bestTimeToVisit: 'April to June, September to November',
        entryFee: 'Free to walk, €80 for gondola'
      },
      {
        name: 'Leaning Tower of Pisa',
        description: 'Famous tilted bell tower.',
        image: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg',
        location: 'Pisa',
        coordinates: { lat: 43.7230, lng: 10.3966 },
        country: createdCountries.find(c => c.code === 'IT')._id,
        category: 'historical',
        bestTimeToVisit: 'April to June, September to October',
        entryFee: '€20'
      },
      {
        name: 'Amalfi Coast',
        description: 'Stunning coastal drive with picturesque towns.',
        image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
        location: 'Southern Italy',
        coordinates: { lat: 40.6340, lng: 14.6027 },
        country: createdCountries.find(c => c.code === 'IT')._id,
        category: 'natural',
        bestTimeToVisit: 'May to September',
        entryFee: 'Free'
      },
      {
        name: 'Vatican City',
        description: 'Smallest country with Sistine Chapel and St. Peter\'s Basilica.',
        image: 'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg',
        location: 'Vatican City',
        coordinates: { lat: 41.9029, lng: 12.4534 },
        country: createdCountries.find(c => c.code === 'IT')._id,
        category: 'religious',
        bestTimeToVisit: 'October to April',
        entryFee: '€17 for museums'
      },

      // United States
      {
        name: 'Grand Canyon',
        description: 'Massive canyon carved by Colorado River.',
        image: 'https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg',
        location: 'Arizona',
        coordinates: { lat: 36.1069, lng: -112.1129 },
        country: createdCountries.find(c => c.code === 'US')._id,
        category: 'natural',
        bestTimeToVisit: 'March to May, September to November',
        entryFee: '$35 per vehicle'
      },
      {
        name: 'Statue of Liberty',
        description: 'Symbol of freedom and democracy.',
        image: 'https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg',
        location: 'New York',
        coordinates: { lat: 40.6892, lng: -74.0445 },
        country: createdCountries.find(c => c.code === 'US')._id,
        category: 'historical',
        bestTimeToVisit: 'April to June, September to November',
        entryFee: '$23.50'
      },
      {
        name: 'Yellowstone National Park',
        description: 'First national park with geysers and wildlife.',
        image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
        location: 'Wyoming, Montana, Idaho',
        coordinates: { lat: 44.4280, lng: -110.5885 },
        country: createdCountries.find(c => c.code === 'US')._id,
        category: 'natural',
        bestTimeToVisit: 'April to May, September to October',
        entryFee: '$35 per vehicle'
      },
      {
        name: 'Golden Gate Bridge',
        description: 'Iconic suspension bridge in San Francisco.',
        image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
        location: 'San Francisco, California',
        coordinates: { lat: 37.8199, lng: -122.4783 },
        country: createdCountries.find(c => c.code === 'US')._id,
        category: 'modern',
        bestTimeToVisit: 'September to November',
        entryFee: 'Free to walk'
      },
      {
        name: 'Times Square',
        description: 'Bright lights and bustling commercial intersection.',
        image: 'https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg',
        location: 'New York City',
        coordinates: { lat: 40.7580, lng: -73.9855 },
        country: createdCountries.find(c => c.code === 'US')._id,
        category: 'modern',
        bestTimeToVisit: 'April to June, September to November',
        entryFee: 'Free'
      },

      // Brazil
      {
        name: 'Christ the Redeemer',
        description: 'Iconic statue overlooking Rio de Janeiro.',
        image: 'https://images.pexels.com/photos/351283/pexels-photo-351283.jpeg',
        location: 'Rio de Janeiro',
        coordinates: { lat: -22.9519, lng: -43.2105 },
        country: createdCountries.find(c => c.code === 'BR')._id,
        category: 'religious',
        bestTimeToVisit: 'December to March',
        entryFee: 'R$75'
      },
      {
        name: 'Amazon Rainforest',
        description: 'World\'s largest tropical rainforest.',
        image: 'https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg',
        location: 'Amazon Basin',
        coordinates: { lat: -3.4653, lng: -62.2159 },
        country: createdCountries.find(c => c.code === 'BR')._id,
        category: 'natural',
        bestTimeToVisit: 'June to November',
        entryFee: 'Varies by tour'
      },
      {
        name: 'Iguazu Falls',
        description: 'Spectacular waterfalls on Brazil-Argentina border.',
        image: 'https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg',
        location: 'Paraná',
        coordinates: { lat: -25.6953, lng: -54.4367 },
        country: createdCountries.find(c => c.code === 'BR')._id,
        category: 'natural',
        bestTimeToVisit: 'March to May, August to October',
        entryFee: 'R$72'
      },
      {
        name: 'Copacabana Beach',
        description: 'Famous beach with vibrant nightlife.',
        image: 'https://images.pexels.com/photos/351283/pexels-photo-351283.jpeg',
        location: 'Rio de Janeiro',
        coordinates: { lat: -22.9711, lng: -43.1822 },
        country: createdCountries.find(c => c.code === 'BR')._id,
        category: 'natural',
        bestTimeToVisit: 'December to March',
        entryFee: 'Free'
      },
      {
        name: 'Salvador Historic Center',
        description: 'Colonial architecture and Afro-Brazilian culture.',
        image: 'https://images.pexels.com/photos/351283/pexels-photo-351283.jpeg',
        location: 'Salvador, Bahia',
        coordinates: { lat: -12.9714, lng: -38.5014 },
        country: createdCountries.find(c => c.code === 'BR')._id,
        category: 'cultural',
        bestTimeToVisit: 'September to March',
        entryFee: 'Free'
      },

      // Egypt
      {
        name: 'Pyramids of Giza',
        description: 'Ancient wonders and the Great Sphinx.',
        image: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg',
        location: 'Giza',
        coordinates: { lat: 29.9792, lng: 31.1342 },
        country: createdCountries.find(c => c.code === 'EG')._id,
        category: 'historical',
        bestTimeToVisit: 'October to April',
        entryFee: 'EGP 200'
      },
      {
        name: 'Valley of the Kings',
        description: 'Ancient burial ground of pharaohs.',
        image: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg',
        location: 'Luxor',
        coordinates: { lat: 25.7400, lng: 32.6014 },
        country: createdCountries.find(c => c.code === 'EG')._id,
        category: 'historical',
        bestTimeToVisit: 'October to April',
        entryFee: 'EGP 240'
      },
      {
        name: 'Abu Simbel Temples',
        description: 'Massive rock temples built by Ramesses II.',
        image: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg',
        location: 'Aswan',
        coordinates: { lat: 22.3372, lng: 31.6258 },
        country: createdCountries.find(c => c.code === 'EG')._id,
        category: 'historical',
        bestTimeToVisit: 'October to April',
        entryFee: 'EGP 300'
      },
      {
        name: 'Red Sea Coral Reefs',
        description: 'World-class diving and snorkeling destination.',
        image: 'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg',
        location: 'Sharm El Sheikh',
        coordinates: { lat: 27.9158, lng: 34.3300 },
        country: createdCountries.find(c => c.code === 'EG')._id,
        category: 'natural',
        bestTimeToVisit: 'March to May, September to November',
        entryFee: 'Varies by dive center'
      },
      {
        name: 'Karnak Temple',
        description: 'Vast temple complex dedicated to Amun-Ra.',
        image: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg',
        location: 'Luxor',
        coordinates: { lat: 25.7188, lng: 32.6573 },
        country: createdCountries.find(c => c.code === 'EG')._id,
        category: 'historical',
        bestTimeToVisit: 'October to April',
        entryFee: 'EGP 150'
      },

      // Australia
      {
        name: 'Sydney Opera House',
        description: 'Iconic performing arts venue with unique architecture.',
        image: 'https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg',
        location: 'Sydney',
        coordinates: { lat: -33.8568, lng: 151.2153 },
        country: createdCountries.find(c => c.code === 'AU')._id,
        category: 'modern',
        bestTimeToVisit: 'September to November, March to May',
        entryFee: 'AUD $43 for tours'
      },
      {
        name: 'Great Barrier Reef',
        description: 'World\'s largest coral reef system.',
        image: 'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg',
        location: 'Queensland',
        coordinates: { lat: -18.2871, lng: 147.6992 },
        country: createdCountries.find(c => c.code === 'AU')._id,
        category: 'natural',
        bestTimeToVisit: 'June to October',
        entryFee: 'Varies by tour operator'
      },
      {
        name: 'Uluru (Ayers Rock)',
        description: 'Sacred monolith in the heart of Australia.',
        image: 'https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg',
        location: 'Northern Territory',
        coordinates: { lat: -25.3444, lng: 131.0369 },
        country: createdCountries.find(c => c.code === 'AU')._id,
        category: 'natural',
        bestTimeToVisit: 'April to September',
        entryFee: 'AUD $38'
      },
      {
        name: 'Twelve Apostles',
        description: 'Limestone stacks along the Great Ocean Road.',
        image: 'https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg',
        location: 'Victoria',
        coordinates: { lat: -38.6656, lng: 143.1048 },
        country: createdCountries.find(c => c.code === 'AU')._id,
        category: 'natural',
        bestTimeToVisit: 'December to February',
        entryFee: 'Free'
      },
      {
        name: 'Blue Mountains',
        description: 'Scenic mountain range with eucalyptus forests.',
        image: 'https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg',
        location: 'New South Wales',
        coordinates: { lat: -33.7969, lng: 150.3144 },
        country: createdCountries.find(c => c.code === 'AU')._id,
        category: 'natural',
        bestTimeToVisit: 'March to May, September to November',
        entryFee: 'Free for hiking'
      },

      // UAE
      {
        name: 'Burj Khalifa',
        description: 'World\'s tallest building with observation decks.',
        image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg',
        location: 'Dubai',
        coordinates: { lat: 25.1972, lng: 55.2744 },
        country: createdCountries.find(c => c.code === 'AE')._id,
        category: 'modern',
        bestTimeToVisit: 'November to March',
        entryFee: 'AED 149-500'
      },
      {
        name: 'Sheikh Zayed Grand Mosque',
        description: 'Stunning white marble mosque with intricate design.',
        image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg',
        location: 'Abu Dhabi',
        coordinates: { lat: 24.4129, lng: 54.4753 },
        country: createdCountries.find(c => c.code === 'AE')._id,
        category: 'religious',
        bestTimeToVisit: 'November to March',
        entryFee: 'Free'
      },
      {
        name: 'Dubai Mall',
        description: 'One of the world\'s largest shopping malls.',
        image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg',
        location: 'Dubai',
        coordinates: { lat: 25.1975, lng: 55.2796 },
        country: createdCountries.find(c => c.code === 'AE')._id,
        category: 'modern',
        bestTimeToVisit: 'November to March',
        entryFee: 'Free entry'
      },
      {
        name: 'Desert Safari',
        description: 'Adventure in the Arabian desert with dune bashing.',
        image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg',
        location: 'Dubai Desert',
        coordinates: { lat: 25.0657, lng: 55.1713 },
        country: createdCountries.find(c => c.code === 'AE')._id,
        category: 'adventure',
        bestTimeToVisit: 'November to March',
        entryFee: 'AED 150-300'
      },
      {
        name: 'Palm Jumeirah',
        description: 'Artificial archipelago shaped like a palm tree.',
        image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg',
        location: 'Dubai',
        coordinates: { lat: 25.1124, lng: 55.1390 },
        country: createdCountries.find(c => c.code === 'AE')._id,
        category: 'modern',
        bestTimeToVisit: 'November to March',
        entryFee: 'Free to visit'
      },

      // UK
      {
        name: 'Big Ben',
        description: 'Iconic clock tower and symbol of London.',
        image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
        location: 'London',
        coordinates: { lat: 51.4994, lng: -0.1245 },
        country: createdCountries.find(c => c.code === 'GB')._id,
        category: 'historical',
        bestTimeToVisit: 'April to September',
        entryFee: 'Free to view exterior'
      },
      {
        name: 'Stonehenge',
        description: 'Mysterious prehistoric stone circle.',
        image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
        location: 'Wiltshire',
        coordinates: { lat: 51.1789, lng: -1.8262 },
        country: createdCountries.find(c => c.code === 'GB')._id,
        category: 'historical',
        bestTimeToVisit: 'April to September',
        entryFee: '£22.50'
      },
      {
        name: 'Edinburgh Castle',
        description: 'Historic fortress dominating Edinburgh\'s skyline.',
        image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
        location: 'Edinburgh, Scotland',
        coordinates: { lat: 55.9486, lng: -3.1999 },
        country: createdCountries.find(c => c.code === 'GB')._id,
        category: 'historical',
        bestTimeToVisit: 'May to September',
        entryFee: '£19.50'
      },
      {
        name: 'Lake District',
        description: 'Beautiful lakes and mountains in northwest England.',
        image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
        location: 'Cumbria',
        coordinates: { lat: 54.4609, lng: -3.0886 },
        country: createdCountries.find(c => c.code === 'GB')._id,
        category: 'natural',
        bestTimeToVisit: 'May to September',
        entryFee: 'Free'
      },
      {
        name: 'Tower Bridge',
        description: 'Victorian bascule bridge crossing the Thames.',
        image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
        location: 'London',
        coordinates: { lat: 51.5055, lng: -0.0754 },
        country: createdCountries.find(c => c.code === 'GB')._id,
        category: 'historical',
        bestTimeToVisit: 'April to September',
        entryFee: '£11.40'
      }
    ];

    await Place.insertMany(places);
    console.log('Places seeded successfully');
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

connectDB().then(() => {
  seedData();
});