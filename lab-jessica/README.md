# Express Authentication

In this project you are able to POST and GET users. Users must provide basic authorization headers to GET a user. Only allows users to GET their own account information.

## User Schema
 Property  | Type         | Required     | Unique
-----------|--------------|--------------|--------------
username   | string       | true         | true
email      | string       | true         | true
password   | string       | true         | false

## Endpoints

####  `/users`

##### `POST` Request
+ User's password will be hashed then user will be added to database.
+ Pass data as stringified JSON in the body of the request to create a user.
+ Returns the new user's info without the password.
+ Example Curl Request:
`curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X POST -d '{"username": "jessica", "email": "jessica@email.com", "password": "hello"}' localhost:3000/users`
+ Example Response:
``{
  "username": "jessica",
  "email": "jessica@email.com",
  "_id": "587415118007f915b3c9e408"
}``

####  `/users/:id`

##### `GET` Request

+ Must send basic authorization headers with username and password.
+ Users are only authorized to view their own account info.
+ Example Curl Request:
`curl -u jessica:hello :3000/users/587415118007f915b3c9e408`
+ Example Response:
``{
  "username": "jessica",
  "email": "jessica@email.com",
  "_id": "587415118007f915b3c9e408"
}``
