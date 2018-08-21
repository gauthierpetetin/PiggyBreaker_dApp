<template>
  <div id="app">
    <v-app v-cloak light>
      <v-content>
        <app-alert-phishing></app-alert-phishing>
        <app-alert-winner></app-alert-winner>
        <app-header></app-header>
        <router-view/>
        <app-dialog-sign-in></app-dialog-sign-in>
        <app-countdown v-if="gameStarted && metamaskEnabled"></app-countdown>
        <app-discord></app-discord>
        <app-footer></app-footer>
      </v-content>
    </v-app>
  </div>
</template>

<script>

import AlertPhishing from './components/Alert/Phishing.vue'
import AlertWinner from './components/Alert/Winner.vue'
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
import Countdown from './components/Countdown/Countdown.vue'
import Discord from './components/Discord/Discord.vue'
import DialogSignIn from '@/views/contribute/Signin.vue'

import firestoreMixin from '@/mixins/firestore'
import ethereumMixin from '@/mixins/ethereum'

import router from '@/router'
import { eventBus } from '@/main'

// import router from '@/router'

export default {
  name: 'App',
  components: {
    appAlertPhishing: AlertPhishing,
    appAlertWinner: AlertWinner,
    appHeader: Header,
    appFooter: Footer,
    appCountdown: Countdown,
    appDiscord: Discord,
    appDialogSignIn: DialogSignIn
  },
  data () {
    return {
      masterEthereumMixin: true
    }
  },
  mixins: [
    firestoreMixin,
    ethereumMixin
  ],
  computed: {
    metamaskEnabled () {
      return this.$store.state.metamaskEnabled
    },
    gameStarted () {
      return this.$store.state.gameStarted
    }
  },
  mounted () {
    let self = this
    // console.log('MMM : ', this.$t('lang.ethereummixin.notification.withdraw.title'))
    // this.$store.state.authenticateDialog = true

    eventBus.$on('goBackToWelcomePage', this.backToWelcomePage)

    // Check contract config
    if (self.$store.state.contract.address === null && self.$store.state.contract.abi === null) {
      this.getContractConfig().then(function (contract) {
        console.log('Contract config obtained: ', contract.address)
        self.$store.state.contract.address = contract.address
        self.$store.state.contract.abi = JSON.parse(contract.abi)
      })
    }
    // Check if metamask is enabled
    this.loopMetamask()

    // Get current game on firestore
    this.getGame('current')
  },
  methods: {
    backToWelcomePage () {
      console.log('BackToWelcomePage !')
      this.$store.state.gameStarted = false
      this.$store.state.authenticated = false
      this.$store.state.authenticateDialog = false
      router.push('/')
    }
  },
  watch: {
    '$store.state.ethPlayer.address': function (val) {
      if (this.gameStarted) {
        this.identifyPlayer()
      }
    },
    '$store.state.metamaskEnabled': function (val) {
      if (val && this.gameStarted) {
        this.identifyPlayer()
      }
    }
  }
}
</script>

<style>
  [v-cloak] {
    display: none;
  }

  @font-face {
    font-family: gothamRounded;
    src: url('./assets/fonts/gotham-rounded/GothamRounded-Medium.otf');
  }

  #app {
    font-family: gothamRounded;
  }

</style>
