const Users = require('../utils').Models.Clients;
const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { clone, find } = require('lodash');
const Helpers = require('../helpers');
const { getApiErrors } = Helpers.Utils;

exports = module.exports = Passport;

//Serialize the user to store in the session
Passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Deserialize the user object stored in the session to use
Passport.deserializeUser((id, done) => {
  let user = find(Users, { id: id });

  if(!user)
    done(getApiErrors('users.exists').data);
  else
    done(null, user);
});

// Local login strategy
Passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'email',
  passReqToCallback: true,
  session: true
}, (req, email, password, done) => {
  
  process.nextTick(() => {
    let user = clone(req.loginInfo);
    req.loginInfo = undefined;
    done(null,  user);
  });
}));