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
              <template v-if="loading.contribution">
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
        <v-layout v-if="contribution.enable" row wrap class="white--text">
          <!-- Player contribute -->
          <v-flex md12 class="text-xs-center">
            <app-dialog-contribute button-large="true" :dialogGame="game" :playerAddress="player.address" @contribution="onContributionChild"></app-dialog-contribute>
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
                    <app-dialog-contribute :dialogGame="game" :playerAddress="player.address"></app-dialog-contribute>
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
                      <template v-if="loading.break">
                        <v-tooltip right>
                          <img src="/static/img/icon/loading-blocks-200.svg" alt="loading" height="60" slot="activator">
                          <span>Your transaction has been submitted successfully.<br />It will require
                          50-60 seconds until it gets validated by the whole network.</span>
                        </v-tooltip>
                      </template>
                      <template v-else>
                        <app-dialog-break :dialogGame="game" :playerBreakEnable="player.breakEnable" @break="onBreakChild"></app-dialog-break>
                      </template>
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
                    <template v-if="loading.withdraw">
                      <v-tooltip right>
                        <img src="/static/img/icon/loading-blocks-200.svg" alt="loading" height="60" slot="activator">
                        <span>Your transaction has been submitted successfully.<br />It will require
                        50-60 seconds until it gets validated by the whole network.</span>
                      </v-tooltip>
                    </template>
                    <template v-else>
                      <app-dialog-withdraw :dialogPlayer="player" @withdraw="onWithdrawChild"></app-dialog-withdraw>
                    </template>
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
  data () {
    return {
      loading: {
        contribution: false,
        break: false,
        withdraw: false
      }
    }
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
    // Contribution
    onContributionChild (value) {
      this.loading.contribution = true
    },
    // Break
    onBreakChild () {
      this.player.breakEnable = false
      this.loading.break = true
    },
    // Withdraw
    onWithdrawChild () {
      this.player.withdrawEnable = false
      this.loading.withdraw = true
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
  min-height: 95px;
}

.minimum-contribution {
  font-size:28px;margin: 20px 0 50px 0;
}

</style>
