const { get } = require('lodash');

/* Internal Serser Errors (500) */

let errors = (key, value) => {

  let list ={
    mongodb: {
      connection: {
        message: 'Database connection failed'
      },
      validations:{
        fields: {
          field: value,
          message: trans.__('mongo.validations.fields')
        },
        error: {
          message: 'The request can not be completed, try again',
        }
      },
      errors: {
        message: 'The request can not be completed, try again', 
        description: 'Error with database query'
      }
    },
    internal: {
      fields: {
        message: 'The request can not be completed, try again', 
        description: 'Fields validation failed'
      },
      exception: {
        message: 'The request can not be completed, try again', 
        description: 'An error has occurred'
      }
    }
  };
  return get(list, key);
};

module.exports = errors;
