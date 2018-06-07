export default {
  data () {
    return {
      waitMessage: 'Please wait 50-60 seconds until your transaction gets validated by the whole network.'
    }
  },
  methods: {
    metamaskTitle (lockStatus) {
      let errT = 'Unknown error, please contact support.'
      if (lockStatus === 'not_installed') {
        errT = 'No Metamask installed'
      } else if (lockStatus === 'locked') {
        errT = 'Metamask locked'
      } else if (lockStatus === 'wrong_network') {
        errT = 'Wrong Metamask network'
      }
      return errT
    },
    metamaskMessage (lockStatus) {
      let errM = 'Unknown error, please contact support.'
      if (lockStatus === 'not_installed') {
        errM = 'Please install Metamask to play Piggy Breaker!'
      } else if (lockStatus === 'locked') {
        errM = 'Please unlock your Metamask to play Piggy Breaker!'
      } else if (lockStatus === 'wrong_network') {
        errM = 'Please open Metamask and update the network to play Piggy Breaker!'
      }
      return errM
    }
  }
}
