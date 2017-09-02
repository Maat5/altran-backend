const Joi = require('joi');

module.exports = {
  login: {
    email: Joi.string().email().required(),
  }
};
