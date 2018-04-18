<template>
  <div>
    <section>
      <v-parallax class="parallax-background" style="min-height: 1200px">
        <v-layout
          column
          align-center
          justify-center
        >
          <h1 class="black--text mb-2 display-2 text-xs-center" style="margin-top: 20px;">Current Piggy value:<br /><strong>{{ balance }} ETH</strong></h1>

          <img src="/static/img/picto/big-piggy.png" alt="big piggy" height="350">
        </v-layout>

        <v-layout row wrap
        class="white--text">
          <v-container v-if="lockstatus == 'not_installed'" grid-list-xl>
            <v-flex md12 class="text-xs-center black--text" style="font-size:28px">
              <h2 class=" display-2">Wanna play?</h2>
              <br />
              You’ll need a place to store your ether (ETH) in a secure wallet like Metamask. This will also act as your login to the game (no extra password needed).
            </v-flex>
            <v-flex md12 class="text-xs-center black--text" style="font-size:28px">
              <v-btn
                class="mt-3"
                style="background-color: #FF00FF;"
                dark
                large
              >
                Install Metamask
              </v-btn>
            </v-flex>
            <v-flex md12 class="text-xs-center black--text">
              <!-- Getting Started -->
              <app-getting-started></app-getting-started>
              <!-- /Getting Started -->
            </v-flex>
          </v-container>
          <v-container v-if="lockstatus == 'locked'" grid-list-xl>
            <v-flex md12 class="text-xs-center black--text" style="font-size:28px">
              <h2 class=" display-2">Your metamask is locked</h2>
              <br />
              Simply open MetaMask and follow the instruction to unlock it.
            </v-flex>

            <v-flex md12 class="text-xs-center">
            <img src="/static/img/picto/piggy-bank-cage.jpg" alt="piggy locked">
            </v-flex>
            <v-flex md12 class="text-xs-center black--text">
              <!-- Getting Started -->
              <app-getting-started></app-getting-started>
              <!-- /Getting Started -->
            </v-flex>
          </v-container>
          <v-container v-if="lockstatus == 'wrong_network'" grid-list-xl>
            <v-flex md12 class="text-xs-center black--text" style="font-size:28px">
              <h2 class=" display-2">Your metamask is not on the good network</h2>
              <br />
              Simply open MetaMask and change your network.
            </v-flex>

            <v-flex md12 class="text-xs-center">
            <img src="/static/img/picto/piggy-lost.png" alt="piggy locked" width="200">
            </v-flex>
            <v-flex md12 class="text-xs-center black--text">
              <!-- Getting Started -->
              <app-getting-started></app-getting-started>
              <!-- /Getting Started -->
            </v-flex>
          </v-container>

        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-layout
        column
        wrap
        class="my-5"
      >
        <v-flex xs12 sm4 class="my-3">
          <div class="text-xs-center">
            <h2 class=" display-2">How does it work?</h2>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center howitworks-title">1. You <strong>contribute</strong> with Ethers.</div>
                </v-card-title>
                  <v-card-text class="text-xs-center">
                    <img src="/static/img/picto/1-contribute.png" height="150">
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center howitworks-title">2. <strong>Any contributor</strong> can decide to break the Piggy.</div>
                </v-card-title>
                  <v-card-text class="text-xs-center">
                    <img src="/static/img/picto/2-break-piggy.png" height="150">
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center howitworks-title">3. A winner is <strong>chosen randomly</strong> between the contributors.
                        <v-tooltip right>
                        <v-icon slot="activator">info_outline</v-icon>
                        <span>The more you contribute, the more chances you have to win.<br/>Indeed, your chances to win the lottery are proportional to the total amount of your contributions.</span>
                      </v-tooltip>
                    </div>
                  </v-card-title>
                  <v-card-text class="text-xs-center">
                    <img src="/static/img/picto/3-random-winner.png" height="150">
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

  </div>
</template>

<script>

import ethereum from '@/mixins/ethereum'
import GettingStarted from '@/views/faq/GettingStarted'

export default {
  props: {
    lockstatus: null
  },
  data () {
    return {
      dialog: false,
      now: null,
      lastContributionTime: null,
      contributionAmount: 0,
      withdrawAmount: 0,
      breakAvailable: false,
      withdrawAvailable: false,
      activeBreakClass: 'red',
      contributeStatus: 'contributing',
      contribution: '',
      balance: 0,
      rateLimit: 0,
      timeLimit: 180,
      loadingStatus: true
    }
  },
  mixins: [ethereum],
  components: {
    appGettingStarted: GettingStarted
  }
}

</script>
