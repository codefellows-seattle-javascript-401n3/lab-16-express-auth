let User = require('../models/user')
let jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  let [method, token] = req.headers.authorization.split(' ')

  if (method !== 'bearer') {
    return res.json({msg: 'wrong authorization type'})
  }

  let decoded = null

  try {
    decoded = jwt.verify(token, process.env.SECRET || 'DEV')
  } catch(e) {
    return res.status(401).json({msg: 'Authentication error'}) // be intentionally vague with auth errors
  }

  User.findById(decoded._id)
    .then(user => {
      req.user = user
      next()
    })
    .catch(() => res.json({msg: 'Authentication error'}))
}
