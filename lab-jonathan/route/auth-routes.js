let basicAuth = require('../lib/authMiddleware');

module.exports = (router) => {
  router.post('/login', basicAuth, (req, res) =>{
    res.json(req.user.generateToken());
  });
};
