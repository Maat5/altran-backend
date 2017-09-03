const { getRequestsErrors } = require('./../helpers').Utils;

module.exports = (err, req, res, next) => {
  if (err) {
    let getFields = (status, name) => {
      return {
        status: status,
        name: name
      }
    };

    console.log(err)
    let errorType = err.status === 400 && err.name === 'SyntaxError' && err.body ? 
      getFields(400, 'invalidJson') : err.status === 404 ? 
      getFields(404, 'notFound') : getFields(500, 'internal');

    let exception = false;

    if(errorType.name === 'internal')
      exception = err;

    let error = getRequestsErrors(errorType.name, errorType.status, exception);

    return res
      .status(error.statusCode)
      .send(error.data);
  }
  next();
};
