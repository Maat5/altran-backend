const Joi = require('joi');

module.exports = {
  byId: {
    policeNumber: Joi.string().required()
  },
  byName: {
    name: Joi.string().required()
  }
};
