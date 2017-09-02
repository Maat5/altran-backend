const UserController = require('./users');
const express = require('express');
const router = express.Router();
const { Verify , User } = require('../middlewares/oauth');

//asign middleware to all users endpoints
router.use(Verify);

// export routes
module.exports = router;

/**
 * Get by id
 */
router.get('/id/:id', User, UserController.findById);

/**
 * Get by name
 */
router.get('/filter/', User, UserController.findUsers);