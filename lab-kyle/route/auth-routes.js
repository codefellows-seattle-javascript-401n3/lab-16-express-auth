let basicAuth = require('../lib/auth')

module.exports = (router) => {
  router.post('/login', basicAuth, (req, res) => {
    res.json(req.user.generateToken()) // Promisify this workflow
  })
}
