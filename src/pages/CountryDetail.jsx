import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Users, Clock, DollarSign, Globe } from 'lucide-react';
import PlaceCard from '../components/PlaceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';

const CountryDetail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountryData();
  }, [id]);

  const fetchCountryData = async () => {
    try {
      const [countryRes, placesRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/countries/${id}`),
        axios.get(`http://localhost:5000/api/countries/${id}/places`)
      ]);
      
      setCountry(countryRes.data);
      setPlaces(placesRes.data);
    } catch (error) {
      console.error('Error fetching country data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <LoadingSpinner size="large" text="Loading country details..." />
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Country not found
          </h2>
          <Link to="/countries">
            <button className="btn-primary">Back to Countries</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-16"
    >
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={country.flag}
          alt={country.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/countries">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Countries</span>
                </motion.button>
              </Link>
              
              <h1 className="text-5xl font-bold text-white mb-4">{country.name}</h1>
              <p className="text-xl text-white/90 max-w-3xl">{country.description}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Country Info */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Country Code</p>
                <p className="font-semibold text-gray-800 dark:text-white">{country.code}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Currency</p>
                <p className="font-semibold text-gray-800 dark:text-white">{country.currency}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Language</p>
                <p className="font-semibold text-gray-800 dark:text-white">{country.language}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Timezone</p>
                <p className="font-semibold text-gray-800 dark:text-white">{country.timezone}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Places Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Top Destinations in {country.name}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover {places.length} amazing places to visit
          </p>
        </motion.div>

        {places.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              No places found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Places for this country will be added soon!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {places.map((place, index) => (
              <PlaceCard key={place._id} place={place} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CountryDetail;