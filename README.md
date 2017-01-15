![cf](https://i.imgur.com/7v5ASc8.png) lab 16 express authorization
======

# To Submit this Assignment
  * fork this repository
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

# Build Tool Instructions
* create a package.json that lists all dependencies and developer dependencies
* include a readme with a project description and route docs

# Directions
* Create these directories to organize your code:
 * lib
 * model
 * route
 * test
* Create a HTTP Server using `express`
* Use the `http-errors` npm  module with the new`error-response` middleware from lecture
* Create a **User Model** using mongoose with the properties `username`, `password`, and `findHash`
 * The user must have a unique username
 * the user must have an email
 * The user must never store the password as plain text (hash the password)
* Create a Basic Auth Middleware for parsing basic auth headers
* use the `body-parser` express middleware to on `POST` and `PUT` routes
* Your server should depend on the environment variables
 * `PORT` - for setting the port your server will listen on
 * `MONGODB_URI` - for setting the URI that mongoose will conect to

## Server Endpoints
### `/users`
* `POST` request
 * the client should pass the username and passord in the body of the request
 * the server should respond with json describing the created user
 * the response should *NOT* include the users cleartext password nor should it include the hashed version of the password
 * the server should respond with a 400 Bad Request to failed request

### `/users/:id`
* `GET` request
 * the client should pass the username and password to the server using a _Basic_ auth header (Note: curl -u username:password is a shorthand for this)
 * the server should respond with json describing the user
 * the response should *NOT* include the users cleartext password nor should it include the hashed version of the password
 * the server should respond with a 401 Unauthorized to non authenticated users
 * (Extra credit) In addition to authenticating the user, make it so that a user can only GET their own user account info. (i.e. GET /users/15 should
   only work if the credentials for user 15 are included in the header)

## Tests
* your tests should start your server when they begin and stop your server when they finish
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* `/users`
 * `POST` - test 400, responds with the `http-errors` 401 name, for if no `body provided` or `invalid body`
 * `POST` - test 200, Does not include the password
* `/users/:id`
 * `GET` - test 401, responds with the `http-errors` 401 name, if the users could not be authenticated
 * `GET` - test 200, Does not include the password
