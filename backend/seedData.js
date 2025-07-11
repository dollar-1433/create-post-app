const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Country = require('./models/Country');
const Place = require('./models/Place');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const countries = [
  {
    name: 'India',
    code: 'IN',
    flag: '🇮🇳',
    description: 'A land of diverse cultures, ancient traditions, and breathtaking landscapes.',
    capital: 'New Delhi',
    currency: 'Indian Rupee',
    language: 'Hindi, English',
    coordinates: { lat: 20.5937, lng: 78.9629 },
    image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg'
  },
  {
    name: 'Japan',
    code: 'JP',
    flag: '🇯🇵',
    description: 'A perfect blend of ancient traditions and cutting-edge technology.',
    capital: 'Tokyo',
    currency: 'Japanese Yen',
    language: 'Japanese',
    coordinates: { lat: 36.2048, lng: 138.2529 },
    image: 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-161401.jpeg'
  },
  {
    name: 'France',
    code: 'FR',
    flag: '🇫🇷',
    description: 'The epitome of art, culture, cuisine, and romance.',
    capital: 'Paris',
    currency: 'Euro',
    language: 'French',
    coordinates: { lat: 46.6034, lng: 1.8883 },
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg'
  },
  {
    name: 'Italy',
    code: 'IT',
    flag: '🇮🇹',
    description: 'Home to Renaissance art, delicious cuisine, and stunning architecture.',
    capital: 'Rome',
    currency: 'Euro',
    language: 'Italian',
    coordinates: { lat: 41.8719, lng: 12.5674 },
    image: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg'
  },
  {
    name: 'United States',
    code: 'US',
    flag: '🇺🇸',
    description: 'A vast country with diverse landscapes and vibrant cities.',
    capital: 'Washington D.C.',
    currency: 'US Dollar',
    language: 'English',
    coordinates: { lat: 37.0902, lng: -95.7129 },
    image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg'
  },
  {
    name: 'Brazil',
    code: 'BR',
    flag: '🇧🇷',
    description: 'Known for its vibrant culture, beautiful beaches, and Amazon rainforest.',
    capital: 'Brasília',
    currency: 'Brazilian Real',
    language: 'Portuguese',
    coordinates: { lat: -14.2350, lng: -51.9253 },
    image: 'https://images.pexels.com/photos/351283/pexels-photo-351283.jpeg'
  },
  {
    name: 'Egypt',
    code: 'EG',
    flag: '🇪🇬',
    description: 'Land of ancient pharaohs, pyramids, and the mighty Nile River.',
    capital: 'Cairo',
    currency: 'Egyptian Pound',
    language: 'Arabic',
    coordinates: { lat: 26.0975, lng: 31.2357 },
    image: 'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg'
  },
  {
    name: 'Australia',
    code: 'AU',
    flag: '🇦🇺',
    description: 'A continent of unique wildlife, stunning beaches, and vibrant cities.',
    capital: 'Canberra',
    currency: 'Australian Dollar',
    language: 'English',
    coordinates: { lat: -25.2744, lng: 133.7751 },
    image: 'https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg'
  },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    flag: '🇦🇪',
    description: 'A modern oasis of luxury, innovation, and cultural diversity.',
    capital: 'Abu Dhabi',
    currency: 'UAE Dirham',
    language: 'Arabic',
    coordinates: { lat: 23.4241, lng: 53.8478 },
    image: 'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg'
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    description: 'Rich in history, culture, and home to iconic landmarks.',
    capital: 'London',
    currency: 'British Pound',
    language: 'English',
    coordinates: { lat: 55.3781, lng: -3.4360 },
    image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Country.deleteMany({});
    await Place.deleteMany({});
    await User.deleteMany({});

    console.log('Data cleared');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@tourist.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin user created');

    // Insert countries
    const createdCountries = await Country.insertMany(countries);
    console.log('Countries seeded');

    // Create places for each country
    const places = [];
    
    // India places
    const india = createdCountries.find(c => c.name === 'India');
    places.push(
      {
        name: 'Taj Mahal',
        description: 'An ivory-white marble mausoleum and UNESCO World Heritage Site.',
        image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg',
        location: 'Agra, Uttar Pradesh',
        coordinates: { lat: 27.1751, lng: 78.0421 },
        country: india._id,
        category: 'historical',
        bestTimeToVisit: 'October to March'
      },
      {
        name: 'Kerala Backwaters',
        description: 'A network of brackish lagoons and lakes lying parallel to the Arabian Sea.',
        image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg',
        location: 'Kerala',
        coordinates: { lat: 9.4981, lng: 76.3388 },
        country: india._id,
        category: 'natural',
        bestTimeToVisit: 'November to February'
      },
      {
        name: 'Golden Temple',
        description: 'The holiest Gurdwara and most important pilgrimage site of Sikhism.',
        image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg',
        location: 'Amritsar, Punjab',
        coordinates: { lat: 31.6200, lng: 74.8765 },
        country: india._id,
        category: 'religious',
        bestTimeToVisit: 'October to March'
      },
      {
        name: 'Goa Beaches',
        description: 'Beautiful beaches with golden sand and crystal clear waters.',
        image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
        location: 'Goa',
        coordinates: { lat: 15.2993, lng: 74.1240 },
        country: india._id,
        category: 'natural',
        bestTimeToVisit: 'November to February'
      },
      {
        name: 'Rajasthan Palaces',
        description: 'Magnificent palaces showcasing royal Rajasthani architecture.',
        image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg',
        location: 'Rajasthan',
        coordinates: { lat: 27.0238, lng: 74.2179 },
        country: india._id,
        category: 'historical',
        bestTimeToVisit: 'October to March'
      }
    );

    // Japan places
    const japan = createdCountries.find(c => c.name === 'Japan');
    places.push(
      {
        name: 'Mount Fuji',
        description: 'Japan\'s highest mountain and an active stratovolcano.',
        image: 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-161401.jpeg',
        location: 'Honshu Island',
        coordinates: { lat: 35.3606, lng: 138.7274 },
        country: japan._id,
        category: 'natural',
        bestTimeToVisit: 'July to September'
      },
      {
        name: 'Tokyo Skytree',
        description: 'A broadcasting and observation tower in Tokyo.',
        image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
        location: 'Tokyo',
        coordinates: { lat: 35.7101, lng: 139.8107 },
        country: japan._id,
        category: 'modern',
        bestTimeToVisit: 'March to May, September to November'
      },
      {
        name: 'Kyoto Temples',
        description: 'Ancient temples and traditional Japanese architecture.',
        image: 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-161401.jpeg',
        location: 'Kyoto',
        coordinates: { lat: 35.0116, lng: 135.7681 },
        country: japan._id,
        category: 'religious',
        bestTimeToVisit: 'March to May, September to November'
      },
      {
        name: 'Hiroshima Peace Memorial',
        description: 'A memorial park dedicated to the legacy of Hiroshima.',
        image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
        location: 'Hiroshima',
        coordinates: { lat: 34.3853, lng: 132.4553 },
        country: japan._id,
        category: 'historical',
        bestTimeToVisit: 'March to May, September to November'
      },
      {
        name: 'Osaka Castle',
        description: 'A Japanese castle that played a major role in the unification of Japan.',
        image: 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-161401.jpeg',
        location: 'Osaka',
        coordinates: { lat: 34.6873, lng: 135.5262 },
        country: japan._id,
        category: 'historical',
        bestTimeToVisit: 'March to May, September to November'
      }
    );

    // Add places for other countries (abbreviated for brevity)
    const france = createdCountries.find(c => c.name === 'France');
    places.push(
      {
        name: 'Eiffel Tower',
        description: 'Iron lattice tower and global cultural icon of France.',
        image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
        location: 'Paris',
        coordinates: { lat: 48.8584, lng: 2.2945 },
        country: france._id,
        category: 'historical',
        bestTimeToVisit: 'April to June, September to October'
      },
      {
        name: 'Louvre Museum',
        description: 'The world\'s largest art museum and historic monument.',
        image: 'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg',
        location: 'Paris',
        coordinates: { lat: 48.8606, lng: 2.3376 },
        country: france._id,
        category: 'cultural',
        bestTimeToVisit: 'April to June, September to October'
      },
      {
        name: 'Palace of Versailles',
        description: 'A royal château and symbol of absolute monarchy.',
        image: 'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg',
        location: 'Versailles',
        coordinates: { lat: 48.8049, lng: 2.1204 },
        country: france._id,
        category: 'historical',
        bestTimeToVisit: 'April to June, September to October'
      },
      {
        name: 'French Riviera',
        description: 'Mediterranean coastline known for its beaches and luxury.',
        image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
        location: 'Nice, Cannes',
        coordinates: { lat: 43.7102, lng: 7.2620 },
        country: france._id,
        category: 'natural',
        bestTimeToVisit: 'May to September'
      },
      {
        name: 'Mont Blanc',
        description: 'The highest mountain in Western Europe.',
        image: 'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg',
        location: 'Chamonix',
        coordinates: { lat: 45.8326, lng: 6.8652 },
        country: france._id,
        category: 'natural',
        bestTimeToVisit: 'June to September'
      }
    );

    // Continue with other countries...
    const italy = createdCountries.find(c => c.name === 'Italy');
    places.push(
      {
        name: 'Colosseum',
        description: 'Ancient amphitheatre and iconic symbol of Imperial Rome.',
        image: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg',
        location: 'Rome',
        coordinates: { lat: 41.8902, lng: 12.4922 },
        country: italy._id,
        category: 'historical',
        bestTimeToVisit: 'April to June, September to October'
      },
      {
        name: 'Venice Canals',
        description: 'Romantic waterways and stunning architecture.',
        image: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg',
        location: 'Venice',
        coordinates: { lat: 45.4408, lng: 12.3155 },
        country: italy._id,
        category: 'cultural',
        bestTimeToVisit: 'April to June, September to October'
      },
      {
        name: 'Leaning Tower of Pisa',
        description: 'Famous bell tower known for its unintended tilt.',
        image: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg',
        location: 'Pisa',
        coordinates: { lat: 43.7230, lng: 10.3966 },
        country: italy._id,
        category: 'historical',
        bestTimeToVisit: 'April to June, September to October'
      },
      {
        name: 'Amalfi Coast',
        description: 'Stunning coastline with picturesque towns.',
        image: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg',
        location: 'Campania',
        coordinates: { lat: 40.6340, lng: 14.6027 },
        country: italy._id,
        category: 'natural',
        bestTimeToVisit: 'April to June, September to October'
      },
      {
        name: 'Vatican City',
        description: 'Spiritual and administrative headquarters of the Roman Catholic Church.',
        image: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg',
        location: 'Vatican City',
        coordinates: { lat: 41.9029, lng: 12.4534 },
        country: italy._id,
        category: 'religious',
        bestTimeToVisit: 'April to June, September to October'
      }
    );

    // Add remaining countries with 5 places each...
    const usa = createdCountries.find(c => c.name === 'United States');
    places.push(
      {
        name: 'Statue of Liberty',
        description: 'Symbol of freedom and democracy.',
        image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg',
        location: 'New York',
        coordinates: { lat: 40.6892, lng: -74.0445 },
        country: usa._id,
        category: 'historical',
        bestTimeToVisit: 'April to June, September to November'
      },
      {
        name: 'Grand Canyon',
        description: 'Steep-sided canyon carved by the Colorado River.',
        image: 'https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg',
        location: 'Arizona',
        coordinates: { lat: 36.1069, lng: -112.1129 },
        country: usa._id,
        category: 'natural',
        bestTimeToVisit: 'March to May, September to November'
      },
      {
        name: 'Yellowstone National Park',
        description: 'First national park in the world with geothermal features.',
        image: 'https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg',
        location: 'Wyoming',
        coordinates: { lat: 44.4280, lng: -110.5885 },
        country: usa._id,
        category: 'natural',
        bestTimeToVisit: 'April to May, September to October'
      },
      {
        name: 'Golden Gate Bridge',
        description: 'Iconic suspension bridge spanning the Golden Gate strait.',
        image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg',
        location: 'San Francisco',
        coordinates: { lat: 37.8199, lng: -122.4783 },
        country: usa._id,
        category: 'modern',
        bestTimeToVisit: 'September to November'
      },
      {
        name: 'Times Square',
        description: 'Bright lights and bustling commercial intersection.',
        image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg',
        location: 'New York',
        coordinates: { lat: 40.7580, lng: -73.9855 },
        country: usa._id,
        category: 'modern',
        bestTimeToVisit: 'April to June, September to November'
      }
    );

    // Insert all places
    await Place.insertMany(places);
    console.log('Places seeded');

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();