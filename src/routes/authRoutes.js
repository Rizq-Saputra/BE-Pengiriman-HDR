const express = require('express');
const { validateRegister, validateLogin } = require('../validations/validateAuth');
const { register, login, refreshToken, logout } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/refresh-token', refreshToken);
// route with authenticateToken middleware
// it is use to make sure that the user is logged in
router.post('/logout', authenticateToken, logout);

module.exports = router;
