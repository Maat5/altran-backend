const Joi = require('joi');

module.exports = {
  byId: {
    id: Joi.string().required()
  },
  byName: {
    name: Joi.string().required()
  }
};
