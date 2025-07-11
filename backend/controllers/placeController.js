const Place = require('../models/Place');
const Country = require('../models/Country');

// @desc    Get all countries
// @route   GET /api/places/countries
// @access  Public
const getCountries = async (req, res) => {
  try {
    const countries = await Country.find({});
    res.json({
      success: true,
      count: countries.length,
      data: countries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get country by ID
// @route   GET /api/places/countries/:id
// @access  Public
const getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    
    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      });
    }

    res.json({
      success: true,
      data: country
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get places by country
// @route   GET /api/places/countries/:countryId/places
// @access  Public
const getPlacesByCountry = async (req, res) => {
  try {
    const places = await Place.find({ country: req.params.countryId }).populate('country');
    res.json({
      success: true,
      count: places.length,
      data: places
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all places
// @route   GET /api/places
// @access  Public
const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find({}).populate('country');
    res.json({
      success: true,
      count: places.length,
      data: places
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new country
// @route   POST /api/places/countries
// @access  Private/Admin
const createCountry = async (req, res) => {
  try {
    const country = await Country.create(req.body);
    res.status(201).json({
      success: true,
      data: country
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new place
// @route   POST /api/places
// @access  Private/Admin
const createPlace = async (req, res) => {
  try {
    const place = await Place.create(req.body);
    res.status(201).json({
      success: true,
      data: place
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getCountries,
  getCountryById,
  getPlacesByCountry,
  getAllPlaces,
  createCountry,
  createPlace
};