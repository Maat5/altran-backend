
const { chain, isArray, merge, forEach, isObjectLike } = require('lodash');
let ErrorsMsg = require('./errors');
let Utils = {};

/**
 * Get error status from request params
 * @param  {Object} fields Joi Object with all params that not are valid
 * @return {Object}        Response with errors and status code
 */
Utils.validateParams = (fields) => {
  let response = {
    success: false
  };
  let validateFields = (data) => {
    let validation = chain(data)
      .map(function(value) {
        if(has(value, 'path') && has(value, 'context.key'))
          return true;
      })
      .compact()
      .head()
      .value();
    return validation;
  }

  if(!isArray(fields) || !validateFields(fields)){
    merge(response, ErrorsMsg.server('internal.fields'));
    return {
      statusCode: 500,
      data: response
    };
  }

  merge(response, ErrorsMsg.requests('validations'));

  response.errors = [];

  forEach(fields, (value) => {
    let error = ErrorsMsg.params(value);
    response.errors.push(error);
  });

  return {
    statusCode: 400,
    data: response
  };
};

/**
 * Get Internal server errors or generate error
 * by a specific field
 * @param  {Error} error  Error that was generated
 * @param  {String} [field] Field to find error on custom helpers
 * @return {Object}        Response with errors and status code
 */
Utils.getInternalErrors = (error, field) => {

  if(!field){
    let description =  error.message ? error.message: isObjectLike(error) ? error: error.toString();
    error = ErrorsMsg.server('internal.exception');
    if(description)
      error.error = description;
  }
  else
    error = ErrorsMsg.server(field) || ErrorsMsg.server('internal.exception');

  error.success = false;
  return error;
};

/**
 * Get MongoDb errors
 * @param  {Error} error MongoDb error
 * @return {Object}        Response with errors and status code
 */
Utils.getDbErrors = (error) => {
  let response = {
    success: false,
    errors: []
  };
  let errorMessage = ErrorsMsg.server('mongodb.errors');
  if (isArray(error)) {
    errorMessage = ErrorsMsg.server('mongodb.validations.error');
    forEach(error.errors, function(item) {
      if(item){
        let msg = ErrorsMsg.server('mongodb.validations.fields', item.path);
        response.errors.push(msg);
      }
    });
  }
  else{
    errorMessage = ErrorsMsg.server('mongodb.validations.error');
    if(error.errors) {
      forEach(error.errors, function(key, value) {
        if(key){
          let msg = ErrorsMsg.server('mongodb.validations.fields', value);
          response.errors.push(msg);
        }
      });
    }
    else
      response.description = error.message || error;
  }
  merge(response, errorMessage);
  return {
    statusCode: 500,
    data: response
  };
};

/**
 * Get error from custom error list - check errors/api file
 * @param  {String} errorType Error reference
 * @param  {String} field Params for translations
 * @return {Object}        Response with errors and status code
 */
Utils.getApiErrors = (errorType, field) => {

  let response = {
    success: false
  };
  let statusCode = 400;

  let error = ErrorsMsg.api(errorType, field);

  if(error)
    merge(response, error);
  else{
    merge(response, ErrorsMsg.server('internal.fields'));
    statusCode = 500;
  }

  return {
    statusCode: statusCode,
    data: response
  };
};

/**
 * Generate error from custom error list or generated
 * by and exception (only if exception param is present)
 * @param  {String} errorType Error reference
 * @param  {Number} status    Status code to be assigned
 * @param  {Error} exception  Exception to get an internar error
 * @return {Object}        Response with errors and status code
 */
Utils.getRequestsErrors = (errorType, status, exception) => {

  let response = {
    success: false
  };
  let statusCode = status || 400;
  
  if(exception)
    response = Utils.getInternalErrors(exception);
  else{
    let error = ErrorsMsg.requests(errorType);

    if(error)
      merge(response, error);
    else{
      merge(response, ErrorsMsg.server('internal.fields'));
      statusCode = 500;
    }
  }

  return {
    statusCode: statusCode,
    data: response
  };
};

module.exports = Utils;
