'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ETHEREUM_NODE_ENV: '"development"',
  ETHEREUM_NODE_URL: '"wss://ropsten.eth.6120.eu/ws"',
  ETHEREUM_CONTRACT: '"0xcebb5810c4739b201be49a76b4c038652e21c1ec"',
  API_URL: '"http://127.0.0.1:8085/api/invite/email"'
})
