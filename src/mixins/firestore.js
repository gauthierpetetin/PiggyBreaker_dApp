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
        id: 0,
        value: 0,
        nbContributions: 0,
        minContribution: 0,
        breakable: false
      }
    }
  },
  methods: {
    // Get server timestamp
    getServerTimestamp () {
      firebase.database().ref('/.info/serverTimeOffset').on('value', function (offset) {
        var offsetVal = offset.val() || 0
        var serverTime = Date.now() + offsetVal
        // console.log('serverTime', serverTime)
        // console.log('serverTOISO', serverTime.toISOString())
        // var date = new Date(serverTime)
        // console.log('serverTOISO', date.toISOString())
        return serverTime
      })
    },
    getCurrentGame () {
      this.getServerTimestamp()

      let self = this

      // Get current game
      db.collection('game').doc('current')
        .onSnapshot(function (gameItem) {
          console.log('Current data:', gameItem.data())
          self.currentGame = {
            id: gameItem.data().id,
            value: gameItem.data().value,
            nbContributions: gameItem.data().nb_contributions,
            minContribution: gameItem.data().min_contribution,
            breakable: gameItem.data().breakable
          }
        })
    },
    getGamesList () {
      let self = this

      // Get games list
      db.collection('games').orderBy('id', 'desc').limit(11).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach((gameItem) => {
            console.log('Game===>', gameItem)

            // Get broken at datetime
            let brokenAt = null
            if (gameItem.data().broken_at) {
              brokenAt = gameItem.data().broken_at.seconds
            }

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

            self.games.push(game)
          })
        })
    }
  }
}
