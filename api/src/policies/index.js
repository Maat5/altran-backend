const PoliciesController = require('./policies');
const express = require('express');
const router = express.Router();
const { Verify , Admin } = require('../middlewares/oauth');

//asign middleware to all users endpoints
router.use(Verify);

// export routes
module.exports = router;

/**
 * Get by id
 */
router.get('/id/:policeNumber', Admin, PoliciesController.findById);

/**
 * Get by name
 */
router.get('/filter/', Admin, PoliciesController.findUsers);