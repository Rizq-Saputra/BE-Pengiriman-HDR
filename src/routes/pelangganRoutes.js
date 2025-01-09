const express = require('express');
const { validatePelanggan } = require('../validations/pelangganValidation');
const {
  createPelanggan,
  updatePelanggan,
  getPelanggan,
  deletePelanggan,
  getPelangganById,
} = require('../controllers/pelangganController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/pelanggan', validatePelanggan, createPelanggan);
router.put('/pelanggan/:id', validatePelanggan, updatePelanggan);
router.get('/pelanggan/:id', getPelangganById);
router.get('/pelanggan', authenticateToken, getPelanggan);
router.delete('/pelanggan/:id', deletePelanggan);

module.exports = router;
