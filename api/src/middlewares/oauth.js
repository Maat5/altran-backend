const { Helpers } = require('../utils');
const { validateToken } = Helpers.Tokens;
const moment = require('moment');
const { getRequestsErrors } = Helpers.Utils;

/**
 * Verify if user is logged
 * then verify if user have a valid token
 * to do a request on the app
 */
function Verify(req, res, next) {
  let error = {};
  let regex = new RegExp(/^[Bearer]+(\s)+([A-Za-z0-9\-\._~\+\/]+=*)/);

  let token = req.headers.authorization;

  if (!token) {
    error = getRequestsErrors('authHeader', 400);
    return res.status(error.statusCode).send(error.data);
  }
  else if (!regex.test(token)) {
    error = getRequestsErrors('invalidToken', 403);
    return res.status(error.statusCode).send(error.data);
  }
  //verify if user is logged
  if (!req.user) {
    error = getRequestsErrors('invalidUser', 403);
    return res.status(error.statusCode).send(error.data);
  }

  let user = req.user;
  token = token.split(" ")[1];

  let payload = validateToken(token, user.id);
  //check token payload
  if (payload.success) {
    let now = moment().unix();
    let exp = payload.exp;

    if (exp <= now) {
      error = getRequestsErrors('expiredToken', 401)
      return res.status(error.statusCode).send(error.data);
    }
  }
  else {
    error = getRequestsErrors('invalidToken', 403);
    return res.status(error.statusCode).send(error.data);
  }

  next();
};

/**
 * Verify if logged user has an user role
 */
function User(req, res, next) {
  let error = {};

  if (!req.user){
    error = getRequestsErrors('invalidUser', 403);
    return res.status(error.statusCode).send(error.data);
  }
  // if not an admin or user
  if (req.user.role !== 'user' && req.user.role !== 'admin'){
    error = getRequestsErrors('notAllowed', 400)
    return res.status(error.statusCode).send(error.data);
  }

  next();
};

/**
 * Verify if logged user has an admin role
 */
function Admin(req, res, next) {
  let error = {};

  if (!req.user){
    error = getRequestsErrors('invalidUser', 403);
    return res.status(error.statusCode).send(error.data);
  }
  // if not an admin
  if (req.user.role !== 'admin'){
    error = getRequestsErrors('notAllowed', 400)
    return res.status(error.statusCode).send(error.data);
  }

  next();
};

module.exports = {
  Verify,
  User,
  Admin
};
