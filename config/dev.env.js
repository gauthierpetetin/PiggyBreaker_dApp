'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://fidever.io:8080/api"',
  ETHEREUM_NODE_ENV: '"development"',
  ETHEREUM_NODE_URL: '"wss://ropsten.eth.6120.eu/ws"',
  FIRESTORE_APIKEY: JSON.stringify({
    apiKey: 'AIzaSyAYWbp_eZO_gZnyiKUvcULbELP0kl6z_Xg',
    authDomain: 'piggybreaker-dev.firebaseapp.com',
    databaseURL: 'https://piggybreaker-dev.firebaseio.com',
    projectId: 'piggybreaker-dev',
    storageBucket: 'piggybreaker-dev.appspot.com',
    messagingSenderId: '531395449330'
  })
})
