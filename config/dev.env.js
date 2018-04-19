'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ETHEREUM_NODE_ENV: '"development"',
  ETHEREUM_NODE_URL: '"wss://ropsten.eth.6120.eu/ws"',
  ETHEREUM_CONTRACT: '"0x70f2499ad14107eb37536ef4d079a2252ba732a3"',
  API_URL: '"http://127.0.0.1:8085/api/invite/email"'
})
