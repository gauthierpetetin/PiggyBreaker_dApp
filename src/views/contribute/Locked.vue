<template>
    <v-layout row wrap
    class="white--text">
      <v-container v-if="lockstatus === 'not_installed'" grid-list-xl>
        <v-flex md12 class="text-xs-center grey-text" style="font-size:28px">
          <h2 class="display-2 grey-text" style="margin-top: 35px">Wanna play?</h2>
          <br />
          You’ll need a place to store your ether (ETH) in a secure wallet like Metamask. This will also act as your login to the game (no extra password needed).
        </v-flex>
        <v-flex md12 class="text-xs-center grey-text" style="font-size:28px">
          <img src="/static/img/picto/metamask.png" alt="no metamask" style="max-width: 150px; margin-top: 20px; margin-bottom: 10px">
        </v-flex>
        <v-flex v-if="metamaskUrl" md12 class="text-xs-center grey-text" style="font-size:28px">
          <v-btn
            class="mt-3"
            style="background-color: #2196f3; margin-bottom: 100px"
            dark
            large
            :href="metamaskUrl"
            target="_blank"
          >
            Install Metamask
          </v-btn>
        </v-flex>
        <v-flex v-else md6 offset-md3 class="text-xs-center grey-text" style="font-size:28px;margin-bottom: 100px;">
          <v-alert :value="true" outline color="error" icon="warning">
            Sorry, your browser does not support MetaMask.
          </v-alert>
        </v-flex>
        <v-flex md12 class="text-xs-center black--text">
          <!-- Getting Started -->
          <app-getting-started></app-getting-started>
          <!-- /Getting Started -->
        </v-flex>
      </v-container>
      <v-container v-if="lockstatus === 'locked'" grid-list-xl>
        <v-flex md12 class="text-xs-center grey-text" style="font-size:28px; margin-top: 30px; margin-bottom: 100px">
          <h2 class="grey-text display-2">Your metamask is locked</h2>
          <v-flex md12 class="text-xs-center">
            <img src="/static/img/picto/piggy-bank-cage.png" alt="piggy locked" style="margin: 20px 0; max-width: 200px">
          </v-flex>
          Simply open MetaMask and follow the instruction to unlock it.
        </v-flex>

        <v-flex md12 class="text-xs-center black--text">
          <!-- Getting Started -->
          <app-getting-started></app-getting-started>
          <!-- /Getting Started -->
        </v-flex>
      </v-container>
      <v-container v-if="lockstatus === 'wrong_network'" grid-list-xl>
        <v-flex md12 class="text-xs-center grey-text" style="font-size:28px; margin-top: 30px; margin-bottom: 100px">
          <h2 class=" display-2 grey-text" style="margin-bottom: 25px">Sorry, you're on the wrong network</h2>
          <span class="grey--text" style="margin-bottom: 15px">Simply open MetaMask and switch over to the</span> {{ networkMessage }}.
          <v-flex md12 class="text-xs-center" style="margin-top: 25px;">
            <img :src="networkImage" alt="piggy locked" width="300">
          </v-flex>
        </v-flex>

        <v-flex md12 class="text-xs-center black--text">
          <!-- Getting Started -->
          <app-getting-started></app-getting-started>
          <!-- /Getting Started -->
        </v-flex>
      </v-container>

    </v-layout>

</template>

<script>

import GettingStarted from '@/views/faq/GettingStarted'
const { detect } = require('detect-browser')
const browser = detect()

export default {
  props: {
    lockstatus: null
  },
  components: {
    appGettingStarted: GettingStarted
  },
  computed: {
    // Set network message
    networkMessage () {
      let message = null
      if (process.env.ETHEREUM_NODE_ENV === 'development') {
        message = 'Ropsten Test Network'
      } else {
        message = 'Main Ethereum Network'
      }
      return message
    },
    // Set network image
    networkImage () {
      let image = null
      if (process.env.ETHEREUM_NODE_ENV === 'development') {
        image = '/static/img/picto/network-ropsten.png'
      } else {
        image = '/static/img/picto/network-main.png'
      }
      return image
    },
    // Set MetaMask Url
    metamaskUrl () {
      let metamaskUrl = null
      switch (browser && browser.name) {
        case 'chrome':
          metamaskUrl = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'
          break
        case 'firefox':
          metamaskUrl = 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/'
          break
        case 'opera':
          metamaskUrl = 'https://addons.opera.com/fr/extensions/details/metamask/'
          break
        default:
          metamaskUrl = null
      }
      return metamaskUrl
    }
  }
}

</script>
