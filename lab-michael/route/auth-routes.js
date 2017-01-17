let basicAuth = require('../lib/basic-auth');

module.exports = (router) => {
  router.post('/login', basicAuth, (req, res) => {
    console.log(req);
    res.json(req.user.generateToken());
  });
};