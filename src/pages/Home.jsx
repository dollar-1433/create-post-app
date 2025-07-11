import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, MapPin, Users, Compass } from 'lucide-react';
import Earth3D from '../components/Earth3D';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [stats, setStats] = useState({ countries: 0, places: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [countriesRes, placesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/countries'),
        axios.get('http://localhost:5000/api/places')
      ]);
      
      setCountries(countriesRes.data);
      setStats({
        countries: countriesRes.data.length,
        places: placesRes.data.length
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading amazing destinations..." />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen pt-16"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="gradient-text">Explore</span>
                <br />
                <span className="text-gray-800 dark:text-white">The World</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Discover breathtaking destinations, immerse yourself in diverse cultures, 
                and create unforgettable memories around the globe.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link to="/countries">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
                  >
                    <Compass className="w-6 h-6" />
                    <span>Start Exploring</span>
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2"
                >
                  <Globe className="w-6 h-6" />
                  <span>View 3D Globe</span>
                </motion.button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="float-animation">
                <Earth3D countries={countries} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{stats.countries}</h3>
              <p className="text-gray-600 dark:text-gray-300">Countries</p>
            </div>
            
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <MapPin className="w-8 h-8 text-green-600 dark:text-green-400" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{stats.places}</h3>
              <p className="text-gray-600 dark:text-gray-300">Destinations</p>
            </div>
            
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white">1M+</h3>
              <p className="text-gray-600 dark:text-gray-300">Travelers</p>
            </div>
            
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Compass className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white">24/7</h3>
              <p className="text-gray-600 dark:text-gray-300">Support</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Countries Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From ancient wonders to modern marvels, discover the world's most captivating destinations
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.slice(0, 6).map((country, index) => (
              <motion.div
                key={country._id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card group overflow-hidden"
              >
                <Link to={`/countries/${country._id}`}>
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img
                      src={country.flag}
                      alt={country.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{country.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                      {country.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="text-center mt-12"
          >
            <Link to="/countries">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                View All Countries
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;