import db from '@/components/firebaseInit'
import firebase from 'firebase'
import moment from 'moment'
import Units from 'ethereumjs-units'
import { eventBus } from '../main'

const settings = {
  timestampsInSnapshots: true
}

db.settings(settings)

require('firebase/firestore')

export default {
  data () {
    return {
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
      }
    }
  },
  computed: {
    currentGame () {
      return this.$store.state.fbCurrentGame
    },
    biggestPiggyValue () {
      return this.$store.state.fbBiggestPiggyValue
    }
  },
  methods: {
    // Get current game
    getContractConfig () {
      // Return a new promise.
      return new Promise(function (resolve, reject) {
        var docRef = db.collection('config').doc('contract')
        docRef.get().then(function (contractItem) {
          if (contractItem.exists) {
            resolve({address: contractItem.data().address, abi: contractItem.data().abi})
          } else {
            // No player email
            reject(Error('No contract config'))
          }
        // }).catch(function (error) {
        //   reject(Error('Error getting player:'))
        })
      })
    },
    // Get current game
    getGame (gameType) {
      let self = this
      // Get current game
      db.collection('game').doc(gameType)
        .onSnapshot(function (gameItem) {
          // Get current time
          firebase.database().ref('/.info/serverTimeOffset').on('value', function (offset) {
            var offsetVal = offset.val() || 0
            var serverTime = Date.now() + offsetVal
            // If current game
            if (gameType === 'current') {
              self.$store.state.fbCurrentGame = self.prepareGame(gameItem, serverTime)
            } else if (gameType === 'previous') {
              self.previousGame = self.prepareGame(gameItem, serverTime)
            } else {
              console.log('Invalid gameType: ', gameType)
            }
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
      // Get game ID
      let gameID = gameItem.data().id
      if (gameID !== this.currentGame.id) {
        console.log('NEW PIGGY : ', gameID)
        eventBus.$emit('new_piggy')
      }

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
      let piggyValue = Units.convert(parseFloat(gameItem.data().value), 'wei', 'eth')
      if (parseFloat(piggyValue) > parseFloat(this.biggestPiggyValue)) {
        this.$store.state.fbBiggestPiggyValue = parseFloat(piggyValue)
      }

      // Calc min contribution
      let minContribution
      if (gameItem.data().min_contribution) {
        minContribution = Units.convert(parseFloat(gameItem.data().min_contribution), 'wei', 'eth')
      }

      // Set game data
      return {
        id: gameID,
        value: piggyValue,
        nbContributions: gameItem.data().nb_contributions,
        minContribution: minContribution,
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
      return new Promise(function (resolve, reject) {
        if (address) {
          var docRef = db.collection('players').doc(address)
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
          var docRef = db.collection('players').doc(address)
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
