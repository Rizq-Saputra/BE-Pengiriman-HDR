const express = require('express');
const { validateBarang } = require('../validations/barangValidation');
const {
  createBarang,
  updateBarang,
  getBarang,
  deleteBarang,
  getBarangById,
} = require('../controllers/barangController');

const router = express.Router();

// Create Barang Route
router.post('/barang', validateBarang, createBarang);

// Update Barang Route
router.put('/barang/:id', validateBarang, updateBarang);

// Get All Barang Route
router.get('/barang', getBarang);

// Get Barang by ID Route
router.get('/barang/:id', getBarangById);

// Delete Barang Route
router.delete('/barang/:id', deleteBarang);

module.exports = router;
