'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ETHEREUM_NODE_URL: '"wss://ropsten.eth.6120.eu/ws"',
  ETHEREUM_CONTRACT: '"0x4b627102aa65754316f88a524871d55d4f4f0123"',
  API_URL: '"http://127.0.0.1:8085/api/invite/email"'
})
