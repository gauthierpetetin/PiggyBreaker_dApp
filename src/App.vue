<template>
  <div id="app">
    <v-app v-cloak light>
      <v-content>
        <!-- HACKATHONUBI <app-alert-phishing></app-alert-phishing> -->
        <app-alert-winner></app-alert-winner>
        <app-header></app-header>
        <router-view/>
        <app-countdown></app-countdown>
        <!-- HACKATHONUBI <app-discord></app-discord> -->
        <!-- HACKATHONUBI <app-footer></app-footer> -->
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

import firestoreMixin from '@/mixins/firestore'
import ethereumMixin from '@/mixins/ethereum'

export default {
  name: 'App',
  components: {
    appAlertPhishing: AlertPhishing,
    appAlertWinner: AlertWinner,
    appHeader: Header,
    appFooter: Footer,
    appCountdown: Countdown,
    appDiscord: Discord
  },
  mixins: [
    firestoreMixin,
    ethereumMixin
  ],
  mounted () {
    let self = this
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
