const Users = require('../utils').Models.Clients;
const Policies = require('../utils').Models.Policies;
const Joi = require('joi');
const validations = require('./validations');
const { find } = require('lodash');
const Helpers = require('../helpers');
const { validateParams, getApiErrors } = Helpers.Utils;

/**
 * Find user by their police id
 * @return {Json}
 */
function findById(req, res) {
  let result = Joi.validate(req.params, validations.byId, {});
  
  if (result.error){
    let error = validateParams(result.error.details);
    return res.status(error.statusCode).send(error.data);
  }

  let userData = result.value;

  let police = find(Policies, { id: userData.policeNumber });
  if(!police)
    return res.status(404).send({ 
      success: false, 
      message: 'Police do not exists',
      description: 'This police do not exists in our platform'
    });

  let client = find(Users, { id: police.clientId });

  if(!client)
    return res.status(404).send(getApiErrors('users.exists').data);
  
  return res.status(200).send({ 
    success: true, 
    data: {
      client: client,
      police: police
    }
   });
}

/**
 * find policies by user name
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
  });

  let policies = [];
  matches.forEach((client) => {
    let _police = find(Policies, { clientId: client.id });
    if(_police)
      policies.push({police: _police, client: client});
  })

  return res.status(200).send({ success: true, data: policies })
}

// export controller
module.exports = {
  findById,
  findUsers
};
