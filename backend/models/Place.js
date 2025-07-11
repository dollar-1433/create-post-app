const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },
  category: {
    type: String,
    enum: ['historical', 'natural', 'cultural', 'adventure', 'religious', 'modern'],
    default: 'cultural'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.5
  },
  bestTimeToVisit: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Place', placeSchema);