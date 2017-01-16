let basicAuth = require('../lib/auth')
let bearerAuth = require('../lib/bearer-auth')
let Game = require('../model/game')
let jsonParser = require('body-parser').json()

module.exports = (router) => {
  router.post('/login', basicAuth, (req, res) => {
    res.json(req.user.generateToken()) // Promisify this workflow
  })

  router.post('/api/games', jsonParser, bearerAuth, (req, res) => {
    console.log(req.body)
    let game = new Game(req.body)
    game.userID = req.user.id
    game.save()
    res.json(game)

  })
}
