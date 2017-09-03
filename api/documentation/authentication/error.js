

 /**
 * @apiDefine ErrorLogin
 * @apiErrorExample {json} User do not exists
 * HTTP/1.1 400 Bad Request
 *
 * {
 *    "success": false,
 *    "message": "User do not exists",
 *    "description": "This user do not exists in our platform"
 * }
 * 
 * @apiErrorExample {json} Validation Failed
 * HTTP/1.1 400 Bad Request
 *
 * {
 *    "success": false,
 *    "message": "Complete all fields correctly to continue the requests",
 *    "errors": [
 *       {
 *          "field": "email",
 *          "message": "The field email is required"
 *       }
 *    ]
 * }
 */