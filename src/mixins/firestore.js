import db from '@/components/firebaseInit'
import firebase from 'firebase'
import moment from 'moment'

const settings = {
  timestampsInSnapshots: true
}

db.settings(settings)

require('firebase/firestore')

export default {
  data () {
    return {
      game: {
        id: null,
        value: 0,
        nbContributions: 0,
        minContribution: 0,
        breakable: false,
        breakableAt: null
      },
      playerSettings: {
        address: null,
        email: null,
        login: null,
        game_over: null,
        new_game: null,
        victory: null,
        withdraw_alert: null
      },
      // currentGame: null,
      serverTimestamp: null
    }
  },
  methods: {
    // Get current game
    getCurrentGame () {
      let self = this
      // Get current game
      db.collection('game').doc('current')
        .onSnapshot(function (gameItem) {
          // Reset contribution
          self.loading.contribution = false
          self.loading.break = false
          self.loading.withdraw = false

          // Get current time
          firebase.database().ref('/.info/serverTimeOffset').on('value', function (offset) {
            var offsetVal = offset.val() || 0
            var serverTime = Date.now() + offsetVal

            // Check breakable
            var breakableAt = gameItem.data().breakable_at.seconds
            var breakable = false
            if (serverTime > breakableAt) {
              breakable = true
            }

            // Set game data
            self.game = {
              id: gameItem.data().id,
              value: gameItem.data().value,
              nbContributions: gameItem.data().nb_contributions,
              minContribution: gameItem.data().min_contribution,
              breakable: breakable,
              breakableAt: breakableAt,
              serverTimestamp: Math.round(serverTime / 1000)
            }

            self.getPlayer()
          })
        })
    },
    // Get games list
    getGamesList () {
      let self = this
      // Get games list
      db.collection('games').orderBy('id', 'desc').limit(11).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach((gameItem) => {
            // Get broken at datetime
            let brokenAt = null
            if (gameItem.data().broken_at) {
              brokenAt = moment.unix(gameItem.data().broken_at.seconds).format('MM/DD/YYYY hh:mm')
            }

            // Format dates
            let createdAt = moment.unix(gameItem.data().created_at.seconds).format('MM/DD/YYYY hh:mm')
            let updatedAt = moment.unix(gameItem.data().updated_at.seconds).format('MM/DD/YYYY hh:mm')

            // Set game data
            let game = {
              id: gameItem.data().id,
              value: gameItem.data().value,
              nbContributions: gameItem.data().nb_contributions,
              open: gameItem.data().open,
              winner: gameItem.data().winner,
              createdAt: createdAt,
              updatedAt: updatedAt,
              brokenAt: brokenAt
            }
            // Add to array
            self.games.push(game)
          })
        })
    },
    // Get player email
    getPlayerEmail (address) {
      // Return a new promise.
      return new Promise(function (resolve, reject) {
        if (address) {
          var docRef = db.collection('players_accounts').doc(address)
          docRef.get().then(function (playerItem) {
            if (playerItem.exists) {
              resolve(playerItem.data().email)
            } else {
              // No player email
              reject(Error('No player email'))
            }
          // }).catch(function (error) {
          //   reject(Error('Error getting player:'))
          })
        }
      })
    },
    // Get player infos
    getPlayerInfo (address) {
      // Return a new promise.
      return new Promise(function (resolve, reject) {
        if (address) {
          var docRef = db.collection('players_accounts').doc(address)
          docRef.get().then(function (playerAccountItem) {
            if (playerAccountItem.exists) {
              let playerEmail = playerAccountItem.data().email
              // Get infos
              var docRef = db.collection('players_emails').doc(playerEmail)
              docRef.get().then(function (playerEmailItem) {
                if (playerEmailItem.exists) {
                  // Set game data
                  let playerInfos = {
                    address: address,
                    email: playerEmailItem.data().email,
                    login: playerEmailItem.data().login,
                    game_over: playerEmailItem.data().game_over,
                    new_game: playerEmailItem.data().new_game,
                    victory: playerEmailItem.data().victory,
                    withdraw_alert: playerEmailItem.data().withdraw_alert
                  }
                  // Resolte data
                  resolve(playerInfos)
                } else {
                  reject(Error('No player'))
                }
              })
            } else {
              // No player email
              reject(Error('No player email'))
            }
          // }).catch(function (error) {
          //   reject(Error('Error getting player:'))
          })
        }
      })
    }
  }
}
