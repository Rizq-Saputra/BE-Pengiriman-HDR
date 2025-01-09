const express = require('express');
const router = express.Router();
const { validateDetailPengiriman } = require('../validations/detailPengirimanValidation');
const {
    createDetailPengiriman,
    getAllDetailPengiriman,
    getDetailPengirimanById,
    updateDetailPengiriman,
    deleteDetailPengiriman,
} = require('../controllers/detailPengirimanController');

router.post('/detail-pengiriman', validateDetailPengiriman, createDetailPengiriman);
router.get('/detail-pengiriman', getAllDetailPengiriman);
router.get('/detail-pengiriman/:id', getDetailPengirimanById);
router.put('/detail-pengiriman/:id', validateDetailPengiriman, updateDetailPengiriman);
router.delete('/detail-pengiriman/:id', deleteDetailPengiriman);

module.exports = router;
