'use strict'

let express = require('express')
let mongoose = require('mongoose')
let morgan = require('morgan')

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/dev'

mongoose.connect(MONGO_URI)
mongoose.Promise = Promise

let app = express()

app.use(morgan('dev'))

require('./route/user-routes')(app)
require('./route/auth-routes')(app)

module.exports = app

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
}
