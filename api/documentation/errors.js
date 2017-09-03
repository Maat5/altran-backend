
/**
 * @apiDefine Errors
 * @apiError (Error) {Boolean} success Status of response
 * @apiError (Error) {String} message Details about the error
 * @apiError (Error) {String} [description] More details about the error
 * @apiError (Error) {Object[]} [errors] Detailed errors
 * @apiError (Error) {String} errors.field Field name
 * @apiError (Error) {String} errors.message Error message
 * @apiErrorExample {json} Internal Server Error
 * HTTP/1.1 500 Internal Server Error
 *
 * {
 *    "success": false,
 *    "code": 501,
 *    "message": "The request can not be completed, try again",
 *    "description": "An error has occurred"
 * }
 */

/**
 * @apiDefine ErrorsExample
 * @apiErrorExample {json} 400 Error example
 * HTTP/1.1 400 Bad Request
 *
 * {
 *    "success": false,
 *    "code": 1000,
 *    "message": "Complete all fields correctly to continue the requests",
 *    "errors": [
 *       {
 *          "code": 5000,
 *          "field": "field",
 *          "message": "The field is required"
 *       }
 *    ]
 * }
 */

/**
 * Good Request but have errors on data
 * Request - malformed params
 * @apiDefine MalformedParams
 * @apiErrorExample Malformed Params
 *     HTTP/1.1 400 Bad Request
 *     {
 *      "success": false,
 *      "code": 000 // Some Code
 *      "message": "Some message",
 *      "errors": [
 *        {
 *          "code": 000, // Specific error code
 *          "field": "field", // field name
 *          "message": "error message" // error description
 *        }
 *      ]
 *     }
 */

/**
 * Header - Invalid Header
 * @apiDefine InvalidHeader
 * @apiErrorExample Invalid Header
 *     HTTP/1.1 403 - Invalid Header
 *     {
 *       "code": 100,
 *       "success": false,
 *       "message": "Invalid Header",
 *       "description": "Authorization header is required"
 *     }
 */

/**
 * Header - Invalid Token
 * @apiDefine InvalidHeaderToken
 * @apiErrorExample Invlid Token
 *     HTTP/1.1 401 - Unauthorized
 *     {
 *       "code": 101,
 *       "success": false,
 *       "message": "Invalid Header",
 *       "description": "Invalid Token"
 *     }
 */

/**
 * Header - Invalid auth header
 * @apiDefine InvalidHeaderAuth
 * @apiErrorExample Header Auth invalid:
 *     HTTP/1.1 401 - Unauthorized
 *     {
 *       "code": 102,
 *       "success": false,
 *       "message": "Invalid Header",
 *       "description": "Error autorization header es invalid"
 *     }
 */

 /**
 * Header - Token is Expired
 * @apiDefine InvalidHeaderExpiredToken
 * @apiErrorExample Expired Token
 *     HTTP/1.1 401 - Unauthorized
 *     {
 *       "code": 103,
 *       "success": false,
 *       "message": "Expired token",
 *       "description": "Token is Expired"
 *     }
 */