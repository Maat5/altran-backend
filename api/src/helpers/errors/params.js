
const { get, isEmpty, isUndefined } = require('lodash');
const serverError = require('./server');

let errors = (value) => {

  if(isEmpty(value) || isUndefined(value.path) || isEmpty(value.context) || isUndefined(value.context.key))
    return serverError('internal.fields');

  let key = getErrorField(value.type, value.path, value.context);

  let list ={
    required: {
      field: value.path,
      message: `The field ${value.context.key } is required`,
    },
    invalid: {
      field: value.path,
      message: `The field ${value.context.key} contains an invalid value`
    },
    empty : {
      field: value.path,
      message: `The field  ${value.context.key} can not be empty`
    },
    notAllowed: {
      field: value.path,
      message: `${value.context.key } not allowed field`
    },
    missing: {
      field: value.path,
      message: `Must contains at least one of : ${value.context.peers ? value.context.peers : value.context.valids }`
    },
    string: {
      base: {
        field: value.path,
        message: `${value.context.key} must be a string`
      },
      length: {
        field: value.path,
        message: `${value.context.key} length must be ${value.context.limit} characters long`
      },
      min: {
        field: value.path,
        message: `${value.context.key} length must be at least ${value.context.limit } characters long`
      }
    }
  };
  return get(list, key);
};

function getErrorField(value, key, context){

  let names = {
    'any.required': 'required',
    'any.invalid': 'invalid',
    'any.empty': 'empty ',
    'object.allowUnknown': 'notAllowed',
    'object.missing': 'missing',
    'any.allowOnly': 'missing',
    'string.base': 'string.base',
    'string.length': 'string.length',
    'string.min': 'string.min',
  };
  if(value === 'string.regex.name' && context.name === 'numbers')
    value = 'number.base';
  if(value === 'string.regex.name' && context.name === 'token')
    value = 'any.invalid';
  if(value === 'string.regex.name' && context.name === 'time')
    value = 'any.invalid';

  return names[value] || key;
}

module.exports = errors;
