'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ETHEREUM_NODE_ENV: '"development"',
  ETHEREUM_NODE_URL: '"wss://ropsten.eth.6120.eu/ws"',
  ETHEREUM_CONTRACT: '"0xd2488e5f638add5adc362d78530cbe4b76e2fe18"',
  API_URL: '"http://127.0.0.1:8085/api/invite/email"'
})
