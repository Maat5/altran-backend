const Users = require('../utils').Models.Clients;
const Joi = require('joi');
const validations = require('./validations');
const { find } = require('lodash');
const Helpers = require('../helpers');
const { validateParams, getApiErrors } = Helpers.Utils;

/**
 * Find user by their own id
 * @return {Json}
 */
function findById(req, res) {
  let result = Joi.validate(req.params, validations.byId, {});
  
  if (result.error){
    let error = validateParams(result.error.details);
    return res.status(error.statusCode).send(error.data);
  }

  let userData = result.value;

  let user = find(Users, { id: userData.id });

  if(!user)
    return res.status(404).send(getApiErrors('users.exists').data);
  
  return res.status(200).send({ success: true, data: user })
}

/**
 * find users
 * @return {Json}
 */
function findUsers(req, res) {

  let result = Joi.validate(req.query, validations.byName, {});

  if (result.error){
    let error = validateParams(result.error.details);
    return res.status(error.statusCode).send(error.data);
  }

  let userData = result.value;
  let matches = Users.filter((user) => {
    return user.name.toLowerCase().indexOf(userData.name.toLowerCase()) !== -1;
  })

  return res.status(200).send({ success: true, data: matches })
}

// export controller
module.exports = {
  findById,
  findUsers
};
