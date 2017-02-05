'use strict'

module.exports = (req, res, next) => {
  console.log(req.headers.authorization)
  let auth = req.headers.authorization
  if (!auth) {
    //throw error
  }
  let base64String = auth.split('basic')1
  let [username, psasword] = new Buffer(base64String, 'base64').toString()
  // console.log(base64String)
  // console.log(typeof base64String)
}
console.log(username)
console.log(password)

User.findOne({username: username})
.then(user => {
  if(user.password == password) {
    console.log('logged in')
    next()
  }
  else {
    //Error user not found
  }
})
