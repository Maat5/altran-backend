const PoliciesController = require('./policies');
const express = require('express');
const router = express.Router();
const { Verify , Admin } = require('../middlewares/oauth');

//asign middleware to all policies endpoints
router.use(Verify);

// export routes
module.exports = router;

/**
 * @api {post} /policies/ Find by name
 * @apiVersion 1.0.0
 *
 * @apiName policeByName
 * @apiGroup Policies
 *
 * @apiParam {String} name user name to filter data
 *
 * @apiParamExample {Object} Name example
 *  http://localhost:8080/policies/?name=man
 *
 * @apiPermission admin
 * @apiUse InvalidHeader
 * @apiUse InvalidHeaderToken
 * @apiUse Errors
 * @apiUse PoliciesByName
 */
router.get('/', Admin, PoliciesController.findUsers);

/**
 * @api {post} /policies/:id Find by Id
 * @apiVersion 1.0.0
 *
 * @apiName policeById
 * @apiGroup Policies
 *
 * @apiParam {String} policeNumber police id 
 *
 * @apiParamExample {Object} Id example
 *  http://localhost:8080/policies/64cceef9-3a01-49ae-a23b-3761b604800b
 *
 * @apiPermission admin
 * @apiUse InvalidHeader
 * @apiUse InvalidHeaderToken
 * @apiUse WontExistsPolice
 * @apiUse Errors
 * @apiUse PoliciesById
 */
router.get('/:policeNumber', Admin, PoliciesController.findById);