const Country = require('../models/Country');
const Place = require('../models/Place');

// Get all countries
const getCountries = async (req, res) => {
  try {
    const countries = await Country.find().sort({ name: 1 });
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get country by ID
const getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get places by country
const getPlacesByCountry = async (req, res) => {
  try {
    const { countryId } = req.params;
    const places = await Place.find({ country: countryId }).populate('country', 'name code flag');
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all places
const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find().populate('country', 'name code flag').sort({ createdAt: -1 });
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create country (Admin only)
const createCountry = async (req, res) => {
  try {
    const country = await Country.create(req.body);
    res.status(201).json(country);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create place (Admin only)
const createPlace = async (req, res) => {
  try {
    const place = await Place.create(req.body);
    const populatedPlace = await Place.findById(place._id).populate('country', 'name code flag');
    res.status(201).json(populatedPlace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update country (Admin only)
const updateCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json(country);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update place (Admin only)
const updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('country', 'name code flag');
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json(place);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete country (Admin only)
const deleteCountry = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    
    // Delete all places in this country
    await Place.deleteMany({ country: req.params.id });
    await Country.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Country and associated places deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete place (Admin only)
const deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json({ message: 'Place deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCountries,
  getCountryById,
  getPlacesByCountry,
  getAllPlaces,
  createCountry,
  createPlace,
  updateCountry,
  updatePlace,
  deleteCountry,
  deletePlace
};