let basicAuth = require('../lib/authentication');
let user = require('../model/user');

module.exports = (router) => {
  router.post('/login', basicAuth, (req, res) => { //going to run same process as basic auth.
    //if username and password check out, they will get here.
    res.json(req.user.generateToken()) //TODO: promisify this workflow
  })
}
