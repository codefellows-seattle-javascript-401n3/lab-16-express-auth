'use strict';

const Router = require('express').Router;
const basicAuth = require('../lib/basic-authentication.js');

const router = module.exports = new Router();

router.post('/login', basicAuth, (req, res) => {
    req.user.generateToken()
    .then(token => res.json(token))
    .catch(err => console.error(err));
});

// ## Server Endpoints
// ### `/api/resource-name`
// * `POST` request
//  * pass data as stringified json in the body of a post request to create a resource
//
// ### `/api/resource-name/:id`
// * `GET` request
//  * pass the id of a resource though the url endpoint to `req.params` to fetch a resource
// * `PUT` request
//  * pass data as stringified json in the body of a put request to update a resource
// * `DELETE` request
//  * pass the id of a resource though the url endpoint to `req.params` to delete a resource
