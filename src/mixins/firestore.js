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
      currentGame: {
        id: null,
        value: 0,
        nbContributions: 0,
        minContribution: 0,
        open: false,
        winner: null,
        createdAt: null,
        updatedAt: null,
        brokenAt: null,
        breakable: null,
        breakableAt: null,
        serverTimestamp: null
      },
      previousGame: {
        id: null,
        value: 0,
        nbContributions: 0,
        minContribution: 0,
        open: false,
        winner: null,
        createdAt: null,
        updatedAt: null,
        brokenAt: null,
        breakable: null,
        breakableAt: null,
        serverTimestamp: null
      },
      playerSettings: {
        address: null,
        email: null,
        login: null,
        notify_start: null,
        notify_stop: null,
        notify_victory: null,
        withdraw_alert: null
      },
      serverTimestamp: null,
      biggestPiggyValue: 0
    }
  },
  methods: {
    // Get current game
    getGame (gameType) {
      let self = this
      // Get current game
      db.collection('game').doc(gameType)
        .onSnapshot(function (gameItem) {
          // Reset contribution
          // self.loading.contribution = false
          // self.loading.break = false
          // self.loading.withdraw = false

          // Get current time
          firebase.database().ref('/.info/serverTimeOffset').on('value', function (offset) {
            var offsetVal = offset.val() || 0
            var serverTime = Date.now() + offsetVal

            // console.log('GameVar: ', self.prepareGame(gameItem))

            if (gameType === 'current') {
              self.currentGame = self.prepareGame(gameItem, serverTime)
            } else if (gameType === 'previous') {
              self.previousGame = self.prepareGame(gameItem, serverTime)
            } else {
              console.log('Invalid gameType: ', gameType)
            }
            self.getEthPlayerData()
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
            self.games.push(self.prepareGame(gameItem))
          })
        })
    },
    prepareGame (gameItem, serverTime) {
      // Format dates
      let createdAt = null
      if (gameItem.data().created_at) {
        createdAt = moment.unix(gameItem.data().created_at.seconds).format('MM/DD/YYYY hh:mm')
      }
      let updatedAt = null
      if (gameItem.data().updated_at) {
        updatedAt = moment.unix(gameItem.data().updated_at.seconds).format('MM/DD/YYYY hh:mm')
      }

      // Get broken at datetime
      let brokenAt = null
      if (gameItem.data().broken_at) {
        brokenAt = moment.unix(gameItem.data().broken_at.seconds).format('MM/DD/YYYY hh:mm')
      }

      // Check breakable
      var breakableAt = null
      var breakable = false
      if (gameItem.data().breakable_at) {
        breakableAt = gameItem.data().breakable_at.seconds
        if (serverTime > breakableAt) {
          breakable = true
        }
      }

      // Collect Piggy value
      let piggyValue = gameItem.data().value
      if (piggyValue > this.biggestPiggyValue) {
        this.biggestPiggyValue = piggyValue
      }

      // Set game data
      return {
        id: gameItem.data().id,
        value: piggyValue,
        nbContributions: gameItem.data().nb_contributions,
        minContribution: gameItem.data().min_contribution,
        open: gameItem.data().open,
        winner: gameItem.data().winner,
        createdAt: createdAt,
        updatedAt: updatedAt,
        brokenAt: brokenAt,
        breakable: breakable,
        breakableAt: breakableAt,
        serverTimestamp: Math.round(serverTime / 1000)
      }
    },
    // Get player email
    getPlayerEmail (address) {
      // Return a new promise.
      console.log('getPlayerEmail===')
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
              // Set game data
              let playerInfos = {
                address: address,
                email: playerAccountItem.data().email,
                login: playerAccountItem.data().login,
                notify_start: playerAccountItem.data().notify_start,
                notify_stop: playerAccountItem.data().notify_stop,
                notify_victory: playerAccountItem.data().notify_victory
              }
              // Resolte data
              resolve(playerInfos)
            } else {
              // No player email
              // reject(Error('No player email'))
              // Set game data
              let playerInfos = {
                address: address,
                email: null,
                login: null,
                notify_start: true,
                notify_stop: true,
                notify_victory: true
              }
              // Resolte data
              resolve(playerInfos)
            }
          // }).catch(function (error) {
          //   reject(Error('Error getting player:'))
          })
        }
      })
    }
  }
}
