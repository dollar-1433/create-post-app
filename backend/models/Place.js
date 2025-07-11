const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Place name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
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
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.5
  },
  category: {
    type: String,
    enum: ['historical', 'natural', 'cultural', 'adventure', 'religious', 'modern'],
    default: 'cultural'
  },
  bestTimeToVisit: String,
  entryFee: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Place', placeSchema);