'use strict'

const request = require('request')
const url = require('url')

function BServiceClient (options) {
  const serviceUrl = options.serviceUrl || 'http://localhost:3002/'
  const apiKey = options.apiKey || 'test'

  var baseRequest = request.defaults({
    headers: {'api-key': apiKey},
    json: true
  })

  return {
    getDataB () {
      const apiUrl = url.resolve(serviceUrl, '/getDataB')

      return new Promise((resolve, reject) => {
        baseRequest(apiUrl, (error, response, body) => {
          if (error) return reject(error)
          if (response.statusCode !== 200) return reject(new Error('ServiceB response with error: ' + response.statusCode + ' ' + response.statusMessage))
          resolve(body)
        })
      })
    }
  }
}

module.exports = BServiceClient
