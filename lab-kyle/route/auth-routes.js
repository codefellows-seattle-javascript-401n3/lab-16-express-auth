let basicAuth = require('../lib/auth')
let bearerAuth = require('../lib/bearer-auth')
let Game = require('../model/game')
let jsonParser = require('body-parser').json()

module.exports = (router) => {
  router.post('/login', basicAuth, (req, res) => {
    res.json(req.user.generateToken()) // Promisify this workflow
  })

  router.post('/api/games', jsonParser, bearerAuth, (req, res) => {
    let game = new Game(req.body)
    game.userID = req.user.id
    game.save()
      .then(game => res.json(game))
      .catch(() => res.status(400).send('bad request'))
  })

  router.get('/api/games/:id', bearerAuth, (req, res) => {
    Game.findById(req.params.id)
      .then(game => res.json(game))
      .catch(() => res.status(404).send('game not found'))
  })

  router.put('/api/games/:id', jsonParser, bearerAuth, (req, res) => {
    Game.findOneAndUpdate(req.params.id, req.body, {new: true})
      .then(game => res.json(game))
      .catch(() => res.status(404).send('game not found'))
  })

  router.delete('/api/games/:id', bearerAuth, (req, res) => {
    Game.findOneAndRemove(req.params.id)
      .then(game => res.json(game))
      .catch(() => res.status(404).send('not found'))
  })
}
