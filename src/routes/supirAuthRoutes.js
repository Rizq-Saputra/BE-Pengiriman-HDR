const express = require('express');
const { validateSupirLogin } = require('../validations/supirAuthValidation');
const { loginSupir, logoutSupir, refreshSupirToken } = require('../controllers/supirAuthController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', validateSupirLogin, loginSupir);
router.post('/refresh-token', refreshSupirToken);
router.post('/logout', authenticateToken, logoutSupir);

module.exports = router;