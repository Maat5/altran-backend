const Users = require('../utils').Models.Clients;
const Joi = require('joi');
const validations = require('./validations');
const { find } = require('lodash');
const Helpers = require('../helpers');
const { validateParams, getApiErrors } = Helpers.Utils;
const Passport = require('../passport/passport');

/**
 * login
 * @return {Json}
 */
function login(req, res) {

  let result = Joi.validate(req.body, validations.login, {});

  if (result.error){
    let error = validateParams(result.error.details);
    return res.status(error.statusCode).send(error.data);
  }

  let userData = result.value;
  // fin user
  let user = find(Users, { email: userData.email });

  if(!user)
    return res.status(404).send(getApiErrors('users.exists').data);

  // authenticate user with passport local strategy
  Passport.authenticate('local', (err, logged) => {
    if(err)
      return res.status(400).send(err);
    
    req.logIn(user, (err) => {
      // console.log(err)
      if(err) return res.status(400).send(err);

      let userToken = Helpers.Tokens.generateToken(user.email, user.id, true);
      user.sessionToken = userToken;

      // success
      return res.status(200).send({ success: true, data: user });
    });
  })(req, res);
}

/**
 * Logout
 * @return {Json}
 */
function logout(req, res) {
  req.session.destroy();
  return res.status(200).send({ success: true });
}

// export controller
module.exports = {
  login,
  logout
};
