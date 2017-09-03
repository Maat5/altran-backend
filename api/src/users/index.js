const UserController = require('./users');
const express = require('express');
const router = express.Router();
const { Verify , User } = require('../middlewares/oauth');

//asign middleware to all users endpoints
router.use(Verify);

// export routes
module.exports = router;

/**
 * @api {post} /users/ Find by name
 * @apiVersion 1.0.0
 *
 * @apiName userByName
 * @apiGroup Users
 *
 * @apiParam {String} name user name to filter data
 *
 * @apiParamExample {Object} Name example
 *  http://localhost:8080/users/?name=man
 *
 * @apiPermission user
 * @apiUse InvalidHeader
 * @apiUse InvalidHeaderToken
 * @apiUse Errors
 * @apiUse UsersByName
 */
router.get('/', User, UserController.findUsers);

/**
 * @api {post} /users/:id Find by Id
 * @apiVersion 1.0.0
 *
 * @apiName userById
 * @apiGroup Users
 *
 * @apiParam {String} id client id
 *
 * @apiParamExample {Object} Id example
 *  http://localhost:8080/users/e8fd159b-57c4-4d36-9bd7-a59ca13057bb
 *
 * @apiPermission user
 * @apiUse InvalidHeader
 * @apiUse InvalidHeaderToken
 * @apiUse WontExists
 * @apiUse Errors
 * @apiUse UsersById
 */
router.get('/:id', User, UserController.findById);