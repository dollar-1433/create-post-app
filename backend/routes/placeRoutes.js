const express = require('express');
const {
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
} = require('../controllers/placeController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/countries', getCountries);
router.get('/countries/:id', getCountryById);
router.get('/countries/:countryId/places', getPlacesByCountry);
router.get('/places', getAllPlaces);

// Admin routes
router.post('/countries', authMiddleware, adminMiddleware, createCountry);
router.post('/places', authMiddleware, adminMiddleware, createPlace);
router.put('/countries/:id', authMiddleware, adminMiddleware, updateCountry);
router.put('/places/:id', authMiddleware, adminMiddleware, updatePlace);
router.delete('/countries/:id', authMiddleware, adminMiddleware, deleteCountry);
router.delete('/places/:id', authMiddleware, adminMiddleware, deletePlace);

module.exports = router;