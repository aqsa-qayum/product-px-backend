const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/protected', authenticateToken, authController.protectedRoute);


module.exports = router;