<template>
  <div>
    <app-contribute v-if="!locked"></app-contribute>
    <app-locked v-if="locked" :lockstatus="lockStatus"></app-locked>
    <section>
      <v-parallax  class="parallax-background" height="280">
        <v-layout column align-center justify-center>
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="display-2 black--text">But what is it?</h2>
            </div>
          </v-flex>
          <div class="headline black--text mb-3 text-xs-center">Piggy Breaker is a game built on blockchain technology.<br/>You can securely play with Ether to get a chance to break the piggy!</div>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-5">
          <v-flex sm12 class="my-3">
            <div class="text-xs-center">
              <h2 class=" display-1">Examples</h2>
            </div>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card class="elevation-0 transparent">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs4>
                    <v-card-media
                      src="/static/img/picto/piggy.png"
                      height="125px"
                      contain
                    ></v-card-media>
                  </v-flex>
                  <v-flex xs8>
                    <v-list class="transparent">
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Piggy value: 40 ETH</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Your contribution: 20 ETH</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Your chances to win the lottery: 50%</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card class="elevation-0 transparent">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs4>
                    <v-card-media
                      src="/static/img/picto/piggy.png"
                      height="125px"
                      contain
                    ></v-card-media>
                  </v-flex>
                  <v-flex xs8>
                    <v-list class="transparent">
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Piggy value: 100 ETH</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Your contribution: 25 ETH</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Your chances to win the lottery: 25%</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </div>
</template>

<script>

import Contribute from '@/views/contribute/Contribute'
import Locked from '@/views/contribute/Locked'

import Web3 from 'web3'

var web3js = window.web3

export default {
  data () {
    return {
      locked: false,
      lockStatus: null
    }
  },
  components: {
    appContribute: Contribute,
    appLocked: Locked
  },
  created () {
    this.checkMetasmask()
    let self = this

    // Loop to check Metamask status
    var accountInterval = setInterval(function() {
      self.checkMetasmask()
    }, 3000)
  },
  methods: {
    checkMetasmask () {
      let self = this
      if (typeof window.web3 !== 'undefined') {
        web3js = new Web3(web3js.currentProvider)
      }

      // Check if installed
      if (!web3js.currentProvider.isMetaMask) {
        self.locked = true
        this.lockStatus = 'not_installed'
      }

      // Get accounts
      web3js.eth.getAccounts()
        .then(function (accounts) {
          if (accounts.length === 0) {
            self.locked = true
            self.lockStatus = 'locked'
          } else {
            // Check if on good network
            web3js.eth.net.getId().then(
              function (netId) {
                if (netId === 1) {
                  if (process.env.ETHEREUM_NODE_ENV === 'development') {
                    self.locked = true
                    self.lockStatus = 'wrong_network'
                  } else {
                    self.locked = false
                  }
                } else if (netId === 3) {
                  if (process.env.ETHEREUM_NODE_ENV === 'production') {
                    self.locked = true
                    self.lockStatus = 'wrong_network'
                  } else {
                    self.locked = false
                  }
                }
              })
          }
        })
    }
  }
}

</script>

<style>
.parallax-background {
  background-image: url('/static/img/background/background-piggies.jpg');
  background-repeat: repeat;
  background-size: 426px 201px;
}

.remaining-time {
  color: #a2a2a2;
  font-weight: bold;
  font-size: 16px;
  margin-left: 15px;
}
</style>
