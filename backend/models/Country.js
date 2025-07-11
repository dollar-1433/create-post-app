const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Country name is required'],
    unique: true,
    trim: true
  },
  code: {
    type: String,
    required: [true, 'Country code is required'],
    unique: true,
    uppercase: true,
    length: 2
  },
  flag: {
    type: String,
    required: [true, 'Flag URL is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
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
  currency: String,
  language: String,
  timezone: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Country', countrySchema);