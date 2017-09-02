const { get } = require('lodash');

let errors = (key) => {

  let list = {
    validations: {
      message: 'Complete all fields correctly to continue the requests'
    },
    invalidJson: {
      message: 'The request can not be completed, try again',
      description: 'Json format invalid'
    },
    authHeader: {
      message: 'Not authenticated',
      description: 'Authentications params missing from header'
    },
    invalidUser: {
      message: 'Not authenticated',
      description: 'The user related to this tokens do not exits'
    },
    invalidToken: {
      message: "Invalid token",
      description: "This token seems to be invalid"
    },
    expiredToken: {
      message: "Token expired",
      description: "This token it's already expired"
    },
    notAllowed: {
      message: 'Not authenticated',
      description: 'You do not have the neccessary permission to do this request'
    }

  }

  return get(list, key);
};

module.exports = errors;
