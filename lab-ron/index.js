'use strict';

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000
const auth = require('./lib/authentication.js')

app.post('/login', (req, res) => {
  res.send('Got a POST request')
})



app.listen(3000, () => console.log(`server up on port ${PORT}`))
console.log()
