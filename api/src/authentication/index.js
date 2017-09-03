
const AuthController = require('./authentication');
const express = require('express');
const router = express.Router();

// export routes
module.exports = router;

/**
 * @api {post} /auth/login Login
 * @apiVersion 1.0.0
 *
 * @apiName userLogin
 * @apiGroup Authentication
 *
 * @apiParam {String} email user email
 *
 * @apiParamExample {Object} Email example
 * "email":"manningblankenship@quotezart.com"
 *
 * @apiPermission none
 * @apiUse ErrorLogin
 * @apiUse Errors
 * @apiUse LoginUser
 */
router.post('/login', AuthController.login);

/**
 * Logout
 */
router.post('/logout', AuthController.logout);