const express = require('express');
const { validateKendaraan } = require('../validations/kendaraanValidation');
const {
  createKendaraan,
  updateKendaraan,
  getKendaraan,
  deleteKendaraan,
  getKendaraanById,
} = require('../controllers/kendaraanController');

const router = express.Router();

// Create Kendaraan Route
router.post('/kendaraan', validateKendaraan, createKendaraan);

// Update Kendaraan Route
router.put('/kendaraan/:id', validateKendaraan, updateKendaraan);

// Get All Kendaraan Route
router.get('/kendaraan', getKendaraan);

// Get Kendaraan by ID Route
router.get('/kendaraan/:id', getKendaraanById);

// Delete Kendaraan Route
router.delete('/kendaraan/:id', deleteKendaraan);

module.exports = router;
