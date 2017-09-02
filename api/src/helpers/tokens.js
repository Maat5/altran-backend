
const jwt = require('jwt-simple');
const config = require('../../../config/config');
const moment = require('moment');

/**
 * Create Token for user
 * @param  {Any} data [Data to be encrypted]
 * @param  {String} user [Id Of user data]
 * @return {String}
 */
function generateToken(data, user, isEmail) {
  let exp = isEmail ? 1 : 10;
  let payload = {
    data: data,
    user: user,
    exp: moment().add(exp, 'days').unix()
  };
  return jwt.encode(payload, config.sessionToken);
};

/**
 * Validate Created token
 * @param  {String} token [Token to be decoded]
 * @param  {[type]} user  [Id Of user data]
 * @return {Object}
 */
function validateToken(token, user) {
  let payload = {}
  try {
   payload = jwt.decode(token, config.sessionToken);
  } 
  catch (e) {
    return {
      success: false,
      code: 101,
      message: 'Your session has expired, try sing in again',
      description: 'Session expired'
    };
  }

  return {
    success: true,
    data: payload.data,
    exp: payload.exp
  };
};

module.exports = {
  generateToken,
  validateToken
};
