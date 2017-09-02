
const AuthController = require('./authentication');
const express = require('express');
const router = express.Router();

// export routes
module.exports = router;

/**
 * Login
 */
router.post('/login', AuthController.login);

/**
 * Logout
 */
router.post('/logout', AuthController.logout);