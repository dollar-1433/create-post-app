import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CountryCard = ({ country, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="card group cursor-pointer overflow-hidden"
    >
      <Link to={`/countries/${country._id}`}>
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <motion.img
            src={country.flag}
            alt={country.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-bold">{country.name}</h3>
            <p className="text-sm opacity-90">{country.code}</p>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {country.description}
          </p>
          
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Currency: {country.currency}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Language: {country.language}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Timezone: {country.timezone}</span>
            </div>
          </div>
          
          <motion.div
            whileHover={{ x: 5 }}
            className="mt-4 text-blue-500 font-semibold flex items-center space-x-2"
          >
            <span>Explore Places</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CountryCard;