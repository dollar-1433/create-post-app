import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, DollarSign } from 'lucide-react';

const PlaceCard = ({ place, index }) => {
  const getCategoryColor = (category) => {
    const colors = {
      historical: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
      natural: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      cultural: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      adventure: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      religious: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      modern: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    return colors[category] || colors.cultural;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="card group overflow-hidden"
    >
      <div className="relative h-56 overflow-hidden rounded-t-2xl">
        <motion.img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(place.category)}`}>
            {place.category}
          </span>
        </div>
        
        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-white text-sm font-semibold">{place.rating}</span>
        </div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{place.name}</h3>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{place.location}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {place.description}
        </p>
        
        <div className="space-y-3">
          {place.bestTimeToVisit && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Best time: {place.bestTimeToVisit}</span>
            </div>
          )}
          
          {place.entryFee && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <DollarSign className="w-4 h-4" />
              <span>Entry: {place.entryFee}</span>
            </div>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-4 btn-primary"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PlaceCard;