**Authentication Lab**

Lab 16
______________

The app demonstrates the use of authentication middleware with Basic auth. Passwords are hashed using the crypt node module and hashed passwords are kept in a local Mongo DB storage.

Three HTTP requests are implemented on the /users route. These are explained below

- POST: when a post request is made on the /users route, the client must include a username, password and email or else an error will be thrown per the requirements in the user model. The client enters the password in plain text but the auth middleware handles it and stores it as a hashed value in the Mongo DB

- GET: When a get request on the /users/:id route, the client will put in the unique id of the user as the id params, and will need to provide the users username and plain text password into the get request. If the username and password are correct, then server will give a response saying that they are logged in. If the password is incorrect then a response will say "wrong password".

- DELETE: When a delete request is made on the /users/:id route, the client will put in the unique id of the user as the id params and, similar to the get request will need to authenticate in order to have the delete work.

This demonstrates basic auth and good-practice storing of passwords but the big issue here is that there is no implementation of authorization, so it would be possible for one user to delete another user if the former is authenticated, even though they obviously should not have permissions to do so.
