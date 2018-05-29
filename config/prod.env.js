'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_URL: '"https://piggy:cochon@staging.piggybreaker.com/api/"',
  ETHEREUM_NODE_ENV: '"development"',
  ETHEREUM_NODE_URL: '"wss://ropsten.eth.6120.eu/ws"',
  // FIRESTORE_APIKEY: JSON.stringify({
  //   apiKey: "AIzaSyDHHJ3_3xPBexOicUlsfeXUbhIjnGfX2-g",
  //   authDomain: "piggy-breaker.firebaseapp.com",
  //   databaseURL: "https://piggy-breaker.firebaseio.com",
  //   projectId: "piggy-breaker",
  //   storageBucket: "piggy-breaker.appspot.com",
  //   messagingSenderId: "416246154436"
  // })
  FIRESTORE_APIKEY: JSON.stringify({
    apiKey: 'AIzaSyAYWbp_eZO_gZnyiKUvcULbELP0kl6z_Xg',
    authDomain: 'piggybreaker-dev.firebaseapp.com',
    databaseURL: 'https://piggybreaker-dev.firebaseio.com',
    projectId: 'piggybreaker-dev',
    storageBucket: 'piggybreaker-dev.appspot.com',
    messagingSenderId: '531395449330'
  })
}
