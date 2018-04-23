<template>
  <div>

    <section>
      <v-parallax class="parallax-background">
        <v-layout
          column
          align-center
          justify-center
        >
          <h1 class="black--text mb-2 display-2 text-xs-center" style="margin-top: 50px;">Current Piggy value:<br /><strong>{{ currentGame.value }} ETH</strong></h1>
          <!-- Player contribution amount -->
          <section v-if="contributionEnable">
            <h1 class="black--text mb-2 display-2 text-xs-center" style="margin-top: 20px;">
              Your contribution:<br />
              <template v-if="contributionLoadingStatus">
                <v-tooltip right>
                  <img src="/static/img/icon/loading-blocks-200.svg" alt="loading" height="60" slot="activator">
                  <span>Your contribution has been submitted successfully.<br />It will require
                  50-60 seconds until it gets validated by the whole network.</span>
                </v-tooltip>
              </template>
              <template v-else>
                <strong>{{ player.contributionBalance }} ETH</strong>
              </template>
            </h1>
          </section>
          <!-- /Player contribution amount -->
          <img src="/static/img/picto/big-piggy.png" alt="big piggy" height="350">
        </v-layout>
        <v-layout row wrap
        class="white--text">
          <!-- Player contribute -->
          <v-flex v-if="contributionEnable" md12 class="text-xs-center">
            <app-dialog-contribute button-large="true" :piggy="piggy" :player="player" @contribution="onContributionChild"></app-dialog-contribute>
          </v-flex>
          <v-flex v-else md12 class="text--center">
            <app-locked :lockstatus="lockStatus"></app-locked>
          </v-flex>
          <!-- /Player contribute -->
          <v-flex v-if="contributionEnable" md12 class="text-xs-center black--text" style="font-size:28px;margin: 20px 0 50px 0;">
            Minimum contribution: {{ currentGame.minContribution }} ETH
            <v-tooltip right>
              <v-icon slot="activator">info_outline</v-icon>
              <span>The minimum contribution can go up or down with time.<br/>It increases when the frequency of player contributions increases.</span>
            </v-tooltip>
          </v-flex>
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
                  <v-card-text v-if="contributionEnable" class="text-xs-center">
                    <!-- Dialog -->
                    <app-dialog-contribute :game="currentGame"></app-dialog-contribute>
                    <!-- /Dialog -->
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
                  <v-card-text v-if="contributionEnable" class="text-xs-center">
                    <template v-if="breakLoadingStatus">
                      <v-tooltip right>
                        <img src="/static/img/icon/loading-blocks-200.svg" alt="loading" height="60" slot="activator">
                        <span>Your transaction has been submitted successfully.<br />It will require
                        50-60 seconds until it gets validated by the whole network.</span>
                      </v-tooltip>
                    </template>
                    <template v-else>
                      <!-- Dialog -->
                      <app-dialog-break :game="currentGame" :player="player" @break="onBreakChild"></app-dialog-break>
                      <!-- /Dialog -->
                    </template>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center howitworks-title">3. A winner is <strong>chosen randomly</strong> between the contributors.
                        <v-tooltip right>
                        <v-icon slot="activator">info_outline</v-icon>
                        <span></span>
                      </v-tooltip>
                    </div>
                  </v-card-title>
                  <v-card-text class="text-xs-center">
                    <img src="/static/img/picto/3-random-winner.png" height="150">
                  </v-card-text>
                  <v-card-text  v-if="contributionEnable" class="text-xs-center">
                    <template v-if="withdrawLoadingStatus">
                      <v-tooltip right>
                        <img src="/static/img/icon/loading-blocks-200.svg" alt="loading" height="60" slot="activator">
                        <span>Your transaction has been submitted successfully.<br />It will require
                        50-60 seconds until it gets validated by the whole network.</span>
                      </v-tooltip>
                    </template>
                    <template v-else>
                      <!-- Dialog -->
                      <app-dialog-withdraw :player="player" @withdraw="onWithdrawChild"></app-dialog-withdraw>
                      <!-- /Dialog -->
                    </template>
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
// import Countdown from '@/components/Countdown/Countdown.vue'
import Locked from '@/views/contribute/Locked'
import DialogContribute from '@/views/contribute/DialogContribute.vue'
import DialogBreak from '@/views/contribute/DialogBreak.vue'
import DialogWithdraw from '@/views/contribute/DialogWithdraw.vue'

import piggyMixin from '@/mixins/piggy'
import firestoreMixin from '@/mixins/firestore'

export default {
  components: {
    appLocked: Locked,
    AppDialogContribute: DialogContribute,
    AppDialogBreak: DialogBreak,
    AppDialogWithdraw: DialogWithdraw
  },
  mixins: [
    piggyMixin,
    firestoreMixin
  ],
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      // Check if metamask is enabled
      this.checkMetasmask()

      // Get current game
      this.getCurrentGame()
      /*
      this.getCurrentWSPiggy()
      this.checkMetasmask()
      this.catchEvents()

      // Loop to check Metamask status
      let self = this
      setInterval(function () {
        self.checkMetasmask()
      }, 3000)
      */
    },
    // Contribution
    onContributionChild (value) {
      this.contributionLoadingStatus = true
    },
    // Break
    onBreakChild () {
      this.breakPiggy()
    },
    // Withdraw)
    onWithdrawChild () {
      this.withdrawPiggy()
    }
  }
}
</script>

<style scoped>

.parallax-background {
  background-image: url("/static/img/background/background-piggies.jpg");
  background-repeat: repeat;
  background-size: 426px 201px;
  height: auto !important;
}

.remaining-time {
  color: #a2a2a2;
  font-weight: bold;
  font-size: 16px;
  margin-left: 15px;
}

.activeBreak {
  background-color: #ff0000;
}

.howitworks-title {
  min-height: 65px;
}

</style>
