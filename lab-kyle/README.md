# Lab 16 Express-Authorization

This app uses mongodb and express to create a server and save new users to a
database. The users have a username, password, and email. The password gets
hashed using the bcrypt node module. I created some authorization middleware
that will check the hashed version of the sent password with the stored version
to verify the user has put in the correct information.

## Endpoints

### '/users'

  - example `http://localhost:3000/users`

    * `POST` request
    * The client must pass in both a username and password
      - '{"username": "user", "password": "pass"}'
    * will return an object representing the newly created user

### '/users/:id'

  - example `http://localhost:3000/users/:id`

    * `GET` request
    * The client must pass in user information using a _Basic_ authorization headers
      - curl -u username:password
    * will return an ojbect representing the queried user
