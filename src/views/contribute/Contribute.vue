<template>
  <div>
    <!-- Contribute -->
    <section>
      <v-parallax class="parallax-background">
        <v-layout
          column
          align-center
          justify-center
        >
          <h1 class="black--text mb-2 display-2 text-xs-center current">Current Piggy value:<br /><strong>{{ game.value }} ETH</strong></h1>
          <!-- Player contribution amount -->
          <section v-if="contribution.enable">
            <h1 class="black--text mb-2 display-2 text-xs-center contribution">
              Your contribution:<br />
              <strong>{{ player.contributionBalance }} ETH</strong>
            </h1>
          </section>
          <!-- /Player contribution amount -->
          <img src="/static/img/picto/big-piggy.png" alt="big piggy" height="350">
        </v-layout>
        <v-layout v-if="contribution.enable" row wrap class="white--text">
          <!-- Player contribute -->
          <v-flex md12 class="text-xs-center">
            <app-dialog-contribute button-large="true" :game="game"></app-dialog-contribute>
          </v-flex>
          <!-- /Player contribute -->
          <v-flex md12 class="text-xs-center black--text minimum-contribution">
            Minimum contribution: <span>{{ game.minContribution }} ETH</span>
            <v-tooltip right>
              <v-icon slot="activator">info_outline</v-icon>
              <span>The minimum contribution can go up or down with time.<br/>It increases when the frequency of player contributions increases.</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
        <v-layout v-else row wrap class="white--text">
          <app-locked :lockstatus="contribution.status"></app-locked>
        </v-layout>
      </v-parallax>
    </section>
    <!-- How does it work? -->
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
                  <v-card-text class="text-xs-center">
                    <!-- Dialog -->
                    <app-dialog-contribute :game="game"></app-dialog-contribute>
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
                  <v-card-text class="text-xs-center">
                    <template>
                      <!-- Dialog -->
                      <app-dialog-break :game="game" :playerBreakEnable="player.breakEnable" @break="onBreakChild"></app-dialog-break>
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
                  <v-card-text class="text-xs-center">
                    <!-- Dialog -->
                    <app-dialog-withdraw :player="player" @withdraw="onWithdrawChild"></app-dialog-withdraw>
                    <!-- /Dialog -->
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

import firestoreMixin from '@/mixins/firestore'
import ethereumMixin from '@/mixins/ethereum'

import DialogContribute from '@/views/contribute/DialogContribute.vue'
import DialogBreak from '@/views/contribute/DialogBreak.vue'
import DialogWithdraw from '@/views/contribute/DialogWithdraw.vue'
import Locked from '@/views/contribute/Locked'

export default {
  mixins: [
    firestoreMixin,
    ethereumMixin
  ],
  components: {
    AppDialogContribute: DialogContribute,
    AppDialogBreak: DialogBreak,
    AppDialogWithdraw: DialogWithdraw,
    AppLocked: Locked
  },
  mounted () {
    // Check if metamask is enabled
    this.loopMetamask()
    // this.checkMetamask()
    // Get current game
    this.getCurrentGame()
    // Get current game
    // this.getPlayer()
  },
  methods: {
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

.parallax-background .current {
  margin-top: 50px;
}

.parallax-background .contribution {
  margin-top: 20px;
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

.minimum-contribution {
  font-size:28px;margin: 20px 0 50px 0;
}

</style>
