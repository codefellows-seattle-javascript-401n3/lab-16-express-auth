let bearerAuth = require('../lib/bearer-auth')

module.exports = (router) => {
  router.post('/login', bearerAuth, (req, res) => {
    res.json(req.user.generateToken()) // Promisify this workflow
  })
}
