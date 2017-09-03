/**
 * Polocies by id
 * Polocies - by id
 * @apiDefine PoliciesById
 * @apiSuccessExample Success:
 *     HTTP/1.1 200 Ok
      {
          "success": true,
          "data": {
              "client": {
                  "id": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
                  "name": "Manning",
                  "email": "manningblankenship@quotezart.com",
                  "role": "admin"
              },
              "police": {
                  "id": "64cceef9-3a01-49ae-a23b-3761b604800b",
                  "amountInsured": 1825.89,
                  "email": "inesblankenship@quotezart.com",
                  "inceptionDate": "2016-06-01T03:33:32Z",
                  "installmentPayment": true,
                  "clientId": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
              }
          }
      }
 */


/**
 * Policies by name
 * Policies - byname
 * @apiDefine PoliciesByName
 * @apiSuccessExample Success:
 *     HTTP/1.1 200 Ok
      {
        "success": true,
        "data": [
            {
                "police": {
                    "id": "64cceef9-3a01-49ae-a23b-3761b604800b",
                    "amountInsured": 1825.89,
                    "email": "inesblankenship@quotezart.com",
                    "inceptionDate": "2016-06-01T03:33:32Z",
                    "installmentPayment": true,
                    "clientId": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
                },
                "client": {
                    "id": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb",
                    "name": "Manning",
                    "email": "manningblankenship@quotezart.com",
                    "role": "admin"
                }
            }
        ]
      }
 */



