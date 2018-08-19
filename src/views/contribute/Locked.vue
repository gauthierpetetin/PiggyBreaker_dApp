<template>
    <v-layout row wrap class="white--text" style="margin-top: 40px">
      <v-container v-if="lockstatus === 'not_installed'" grid-list-xl>
        <v-flex md12 class="text-xs-center grey-text" style="font-size:28px">
          <h2 class="display-2 grey-text" style="margin-top: 35px">{{ $t('lang.piggy.locked.wannaPlay') }}</h2>
          <br />
          {{ $t('lang.piggy.locked.youNeedAplaceToStore') }}
        </v-flex>
        <v-flex md12 class="text-xs-center grey-text" style="font-size:28px">
          <img src="/static/img/picto/metamask.png" alt="no metamask" style="max-width: 150px; margin-top: 35px; margin-bottom: 20px">
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
            {{ $t('lang.piggy.locked.installMetamask') }}
          </v-btn>
        </v-flex>
        <v-flex v-else md6 offset-md3 class="text-xs-center grey-text" style="font-size:28px;margin-bottom: 100px;">
          <v-alert :value="true" outline color="error" icon="warning">
            {{ $t('lang.piggy.locked.sorryYourBrowserNotSupport') }}
          </v-alert>
        </v-flex>
        <v-flex md12 class="text-xs-center black--text" style="margin-top: 40px">
          <!-- Getting Started -->
          <app-getting-started></app-getting-started>
          <!-- /Getting Started -->
        </v-flex>
      </v-container>
      <v-container v-if="lockstatus === 'locked'" grid-list-xl>
        <v-flex md12 class="text-xs-center grey-text" style="font-size:28px; margin-top: 30px; margin-bottom: 100px">
          <h2 class="grey-text display-2">{{ $t('lang.piggy.locked.yourMetamaskIsLocked') }}</h2>
          <v-flex md12 class="text-xs-center">
            <img src="/static/img/picto/piggy-bank-cage.png" alt="piggy locked" style="margin: 20px 0; max-width: 200px">
          </v-flex>
          {{ $t('lang.piggy.locked.simplyOpenMetamaskAndFollow') }}
        </v-flex>

        <v-flex md12 class="text-xs-center black--text">
          <!-- Getting Started -->
          <app-getting-started></app-getting-started>
          <!-- /Getting Started -->
        </v-flex>
      </v-container>
      <v-container v-if="lockstatus === 'wrong_network'" grid-list-xl>
        <v-flex md12 class="text-xs-center grey-text" style="font-size:28px; margin-top: 30px; margin-bottom: 100px">
          <h2 class=" display-2 grey-text" style="margin-bottom: 25px">{{ $t('lang.piggy.locked.sorryWrongNetwork') }}</h2>
          <span class="grey--text" style="margin-bottom: 15px">{{ $t('lang.piggy.locked.simplyOpenMetamaskAndSwitch') }}</span> {{ networkMessage }}.
          <v-flex md12 class="text-xs-center" style="margin-top: 50px;">
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
        // message = 'Ropsten Test Network'
        message = this.$t('lang.menu.network.type.ropstenTestNetwork')
      } else {
        // message = 'Main Ethereum Network'
        message = this.$t('lang.menu.network.type.mainEthereumNetwork')
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
