'use strict'

// Packages
const express = require('express')
const logger = require('morgan')

var app = express()

app.use(logger('dev'))

// Service client libs
var BServiceClient = require('./libs/BServiceClient')
var CServiceClient = require('./libs/CServiceClient')

app.get('/', function (req, res) {
  // Configure clients
  var bService = new BServiceClient({apiKey: 'test'})
  var cService = new CServiceClient({apiKey: 'test'})

  // Make api requests
  Promise
  .all([
    bService.getDataB(),
    cService.getDataC()
  ])
  .then(results => {
    // response with data
    res.json(results)
  })
  .catch(error => {
    // response with error
    res.json({error: error.message})
  })
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
