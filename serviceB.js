'use strict'

const express = require('express')
const logger = require('morgan')

const apiKey = process.env.API_KEY || 'test'

var app = express()

app.use(logger('dev'))

app.use((req, res, next) => {
  if (req.headers['api-key'] !== apiKey) return res.status(403).json({error: 'Service B: You provided an invalid api key.'})
  next()
})

app.get('/getDataB', function (req, res) {
  res.json({
    data: {
      from: 'Service B',
      date: new Date()
    }
  })
})

app.listen(3002, function () {
  console.log('Example app listening on port 3002!')
})
