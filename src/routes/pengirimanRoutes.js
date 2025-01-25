// routes.js
const express = require('express');
const router = express.Router();
const { validatePengiriman, validatePengirimanPelanggan, validateUpdatePengiriman } = require('../validations/pengirimanValidation');
const authenticateToken = require('../middleware/authMiddleware');
const {
    createPengiriman,
    getAllPengiriman,
    getPengirimanById,
    updatePengiriman,
    deletePengiriman,
    getPengirimanStats,
    getWeeklyPengirimanStats,
    getPengirimanByPhone,
    exportReport,
    exportReportExcel,
    getPengirimanByResi,
} = require('../controllers/pengirimanController');

router.post('/pengiriman', authenticateToken, validatePengiriman, createPengiriman);
router.get('/pengiriman/export', exportReportExcel);
router.get('/pengiriman/stats', authenticateToken, getPengirimanStats);
router.get('/pengiriman/minggu-ini', authenticateToken, getWeeklyPengirimanStats);
router.get('/pengiriman', authenticateToken, getAllPengiriman);
router.post('/pengiriman-pelanggan', validatePengirimanPelanggan, getPengirimanByResi);
router.get('/pengiriman/:id', authenticateToken, getPengirimanById);
router.patch('/pengiriman/:id', authenticateToken, validateUpdatePengiriman, updatePengiriman);
router.delete('/pengiriman/:id', authenticateToken, deletePengiriman);

module.exports = router;
