let basicAuth = require('../lib/authentication');

module.exports = (router) => {
  router.post('/login', basicAuth, (req, res) => { //going to run same process as basic auth.
    req.user.generateToken()  //if username and password check out, they will get here.
    .then(data => {
      res.json(data);
    })
    .catch(console.error);
  });
};
