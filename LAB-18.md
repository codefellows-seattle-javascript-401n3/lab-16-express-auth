![cf](https://i.imgur.com/7v5ASc8.png) lab 18 authorization
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
* incldue a readme with a project description
* include npm scripts
 * test - to run mocha
 * start - to start the server

# Directions
* create and aws account
* create an aws Access key and secret
 * add them to your env file
* Using the same repository from lab 16
* Create a new mongoose model that represents a file type that you want to store on S3
 * examples are .mp3, .mp4, and .png files...
* create a test that uploads one of these files to your route using form-data
* use multer to parse the request
* upload the file to S3
* create a new insance of your mongoose model storing the URI to your file on s3
* respond to the client with the model stored in your mongo database

# server endpoints
* a `POST` request but you choose your endpoint path :)

## Tests 
* `POST` - 200 test

## Bonus
* 1pt - have a one to many relation ship with your model from yesterday
* 2pt - have a delete route and test that removes your model from S3

