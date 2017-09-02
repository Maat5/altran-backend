
const _ = require('lodash');
const trans = require('i18n');

let errors = (key) => {
  let list = {
    users: {
      unique: {
        message: 'Email already in use',
        description: 'Email current in use by another user, try with another one.'
      },
      exists: {
        message: 'User do not exists',
        description:  'This user do not exists in our platform'
      }
    },
    auth: {
      credentials:{
        message: 'Email or password invalid',
        description: 'Error verifying your credentials'
      }
    }
  }

  return _.get(list, key);
};

module.exports = errors;
