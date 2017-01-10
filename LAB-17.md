![cf](https://i.imgur.com/7v5ASc8.png) lab 17 authorization
======

# To Submit this Assignment
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas
  * write how many hours you spent on canvas

# Build Tool Instructions
* create a package.json that lists all dependencies and developer dependencies
* include an .eslintrc
* include a .gitignore
* include a readme with a project description
* include npm scripts
 * test - to run mocha
 * start - to start the server

# Directions
* Using the same repository from lab 16
* Create a Bearer Auth middleware parsers
* Create a _resource_ that has at least three properties
 * must have a property `userID` that references the `_id` of the user that created the _resource_
 * the `userID` property can only be set from an `_id` found using the _Bearer Auth Middleware_
* use the `body-parser` express middleware to on `POST` and `PUT` routes
* use the npm `debug` module to log the functions being executed in your app
* using the express `Router` create routes for doing **RESTFUL CRUD** operations on your _resource_

## Server Endpoints
### `/api/resource-name`
* `POST` request
 * pass data as stringified json in the body of a post request to create a resource

### `/api/resource-name/:id`
* `GET` request
 * pass the id of a resource though the url endpoint to `req.params` to fetch a resource   
* `PUT` request
 * pass data as stringified json in the body of a put request to update a resource
* `DELETE` request
 * pass the id of a resource though the url endpoint to `req.params` to delete a resource   

## Tests
* your tests should start your server when they begin and stop your server when they finish
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* write tests to ensure your `/api/resource-name` endpoint responds as described for each condition below:
 * `GET` - test 200, response body like `{<data>}` for a request made with a valid id
 * `GET` - test 401, responds with 'unauthorized' if no token was provided
 * `GET` - test 404, responds with 'not found' for valid request made with an id that was not found
 * `PUT` - test 200, response body like  `{<data>}` for a post request with a valid body
 * `PUT` - test 401, responds with 'unauthorized' if no token was provided
 * `PUT` - test 400, responds with 'bad request' for `invalid body`
 * `PUT` - test 404, responds with 'not found' for valid request made with an id that was not found
 * `POST` - test 200, response body like `{<data>}` for a post request with a valid body
 * `POST` - test 401, responds with 'unauthorized' if no token was provided
 * `POST` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`

## Bonus
* **1pts** a `GET` request to `/api/resource-name` should return an array of all of the ids for that resource
* **1pt** write tests for the `DELETE` request
