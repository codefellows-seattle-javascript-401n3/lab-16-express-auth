let User = require('../model/user')
let jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  let [method, token] = req.headers.authorization.split(' ')

  if (method.toLowerCase() !== 'bearer') {
    return res.json({msg: 'wrong authorization type'})
  }

  let decoded = null

  try {
    decoded = jwt.verify(token, process.env.SECRET || 'DEV')
  } catch(e) {
    return res.status(401).json({msg: 'Authentication error 1'}) // be intentionally vague with auth errors
  }

  User.findById(decoded.id)
    .then(user => {
      req.user = user
      next()
    })
    .catch(() => res.json({msg: 'Authentication error 2'}))
}
