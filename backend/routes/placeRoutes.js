const express = require('express');
const {
  getCountries,
  getCountryById,
  getPlacesByCountry,
  getAllPlaces,
  createCountry,
  createPlace
} = require('../controllers/placeController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/countries', getCountries);
router.get('/countries/:id', getCountryById);
router.get('/countries/:countryId/places', getPlacesByCountry);
router.get('/', getAllPlaces);

// Admin routes
router.post('/countries', protect, admin, createCountry);
router.post('/', protect, admin, createPlace);

module.exports = router;