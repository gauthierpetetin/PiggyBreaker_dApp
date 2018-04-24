import db from '@/components/firebaseInit'
import firebase from 'firebase'

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
        breakable: false,
        breakableAt: null
      },
      // currentGame: null,
      serverTimestamp: null
    }
  },
  methods: {
    // Get server timestamp
    getServerTimestamp () {
      let self = this
      firebase.database().ref('/.info/serverTimeOffset').on('value', function (offset) {
        var offsetVal = offset.val() || 0
        var serverTime = Date.now() + offsetVal
        // return serverTime
        self.serverTimestamp = serverTime / 1000
      })
    },
    // Get current game
    getCurrentGame () {
      let self = this
      // Get current game
      db.collection('game').doc('current')
        .onSnapshot(function (gameItem) {
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
            self.currentGame = {
              id: gameItem.data().id,
              value: gameItem.data().value,
              nbContributions: gameItem.data().nb_contributions,
              minContribution: gameItem.data().min_contribution,
              breakable: breakable,
              breakableAt: breakableAt,
              serverTimestamp: serverTime / 1000
            }
            console.log('currentGame', self.currentGame)
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
              brokenAt = gameItem.data().broken_at.seconds
            }
            // Set game data
            let game = {
              id: gameItem.data().id,
              value: gameItem.data().value,
              nbContributions: gameItem.data().nb_contributions,
              open: gameItem.data().open,
              winner: gameItem.data().winner,
              createdAt: gameItem.data().created_at.seconds,
              updatedAt: gameItem.data().updated_at.seconds,
              brokenAt: brokenAt
            }
            // Add to array
            self.games.push(game)
          })
        })
    }
  }
}
