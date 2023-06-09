// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/signup', authController.signup);

module.exports = router;
