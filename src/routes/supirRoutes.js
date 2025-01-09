const express = require('express');
const { validateSupir, validateSupirUpdate } = require('../validations/supirValidation');
const upload = require('../middleware/uploadMiddleware');
const authenticateToken = require('../middleware/authMiddleware');
const {
  createSupir,
  updateSupir,
  getSupir,
  deleteSupir,
  getSupirById,
} = require('../controllers/supirController');

const router = express.Router();

// Protect all routes with authentication
router.post('/supir', authenticateToken, validateSupir, createSupir);
router.patch('/supir/:id', authenticateToken, upload.single('gambar_supir'), validateSupirUpdate, updateSupir);
router.get('/supir/:id', authenticateToken, getSupirById);
router.get('/supir', authenticateToken, getSupir);
router.delete('/supir/:id', authenticateToken, deleteSupir);

module.exports = router;
