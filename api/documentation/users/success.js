/**
 * User by name
 * Users - by name
 * @apiDefine UsersByName
 * @apiSuccessExample Success:
 *     HTTP/1.1 200 Ok
      {
        "success": true,
        "data": [
            {
                "id": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
                "name": "Manning",
                "email": "manningblankenship@quotezart.com",
                "role": "admin"
            },
            {
                "id": "56050ee4-1684-4cbd-9516-f2053cac3b84",
                "name": "Roman",
                "email": "romanblankenship@quotezart.com",
                "role": "user"
            }
        ]
      }
 */

/**
 * User by id
 * Users - by id
 * @apiDefine UsersById
 * @apiSuccessExample Success:
 *     HTTP/1.1 200 Ok
      {
        "success": true,
        "data": {
            "id": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
            "name": "Manning",
            "email": "manningblankenship@quotezart.com",
            "role": "admin"
        }
      }
 */


