<template>
  <div>
    <!-- Contribute -->
    <section>
      <!-- <v-parallax class="parallax-background"> -->
        <v-layout
          column
          align-center
          justify-center
          style="background-color: white"
          >
          <h1 class="pink--text mb-2 display-2 text-xs-center current" style="margin-top: 35px">Total Piggy value: <strong>{{ currentGame.value }} ETH</strong></h1>
          <v-tooltip right>
            <img :src="piggyImage" alt="big piggy" height="350" style="margin-top: 15px" slot="activator">
            <span>{{piggyMessage1}}<br />{{ piggyMessage2 }}</span>
          </v-tooltip>
          <!-- Player contribution amount -->
          <section v-if="contribution.enable" style="margin-top: 15px; min-width: 40%">
            <h1 class="mb-2 headline text-xs-center contribution">
                <template v-if="loading.contribution">
                  <v-flex class="my-3">
                    <span class="grey--text">Your current contribution:</span>
                  </v-flex>
                  <v-flex class="my-3">
                    <v-tooltip right>
                      <img src="/static/img/icon/loading-blocks-200.svg" alt="loading" height="60" slot="activator">
                      <span>Your contribution has been submitted successfully.<br />
                      It will require 50-60 seconds until it gets validated by the whole network.</span>
                    </v-tooltip>
                  </v-flex>
                </template>
                <template v-else>
                  <v-flex class="my-3">
                    <span class="grey--text">Your current contribution:</span>
                    <span class="grey--text">{{ player.contributionBalance }} ETH</span>
                  </v-flex>
                  <v-flex class="my-3">
                    <v-progress-linear :value="percentage" height="20" color="grey"></v-progress-linear>
                  </v-flex>
                </template>
            </h1>
          </section>
          <section v-else>
            <v-progress-circular :size="80" indeterminate color="amber"></v-progress-circular>
          </section>
          <!-- /Player contribution amount -->

        </v-layout>
        <v-layout v-if="contribution.enable && (!loading.contribution)" row wrap class="white--text" style="background-color: white">
          <!-- Player contribute -->
          <v-flex md12 class="text-xs-center">
            <app-dialog-contribute :playEnable="contribution.enable" :lockstatus="contribution.status" button-large="true" :dialogGame="currentGame" :playerAddress="player.address" :playerContribution="player.contributionBalance" @contribution="onContributionChild"></app-dialog-contribute>
          </v-flex>
          <!-- /Player contribute -->
        </v-layout>
        <v-layout v-else row wrap class="white--text">
          <app-locked :lockstatus="contribution.status"></app-locked>
        </v-layout>
      <!-- </v-parallax> -->
    </section>
    <!-- What is Piggy Breaker -->
    <section>
      <v-parallax  class="parallax-background" height="550">
        <v-layout column align-center justify-center>
          <div style="width: 80%; height: 400px; padding: 1% 2%; background-color: white">
          <v-flex class="my-3">
            <div class="text-xs-center">
              <h4 class="display-1 pink--text small-text" style="padding: 10px 0">Piggy Breaker is the next world lottery!</h4>
            </div>
          </v-flex>
          <div class="headline mb-3 text-xs-center title">
            <p>
              <!-- <span class="pink--text">Piggy Breaker is the next world lottery!</span><br /> -->
              The game is centered around Billy, a nice little Piggy bank where everyone can contribute with ether (ETH) to let it grow... and grow... and grow... until it reaches very large amounts.
            </p>
            <img src="/static/img/picto/piggy-growth.png" alt="piggy growth" height="120" style="margin-top: 15px; margin-bottom: 15px">
            <p><br>
              Someday the Piggy bank will break and make one of the players rich...
            </p>
          </div>
        </div>
        </v-layout>
      </v-parallax>
    </section>

    <!-- How does it work? -->
    <section style="background-color: white">
      <v-layout
        column
        wrap
        class="my-5"
        style="margin: 0 0 !important;"
      >
        <v-flex xs12 sm4 class="my-3">
          <div class="text-xs-center">
            <h2 class="display-1 grey-text" style="margin-top: 25px">How does it work?</h2>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center howitworks-title grey-text title">1. You contribute with Ethers.</div>
                </v-card-title>
                  <v-card-text class="text-xs-center">
                    <img src="/static/img/picto/1-contribute.png" height="150">
                  </v-card-text>
                  <v-card-text class="text-xs-center">
                    <!-- Dialog -->
                    <template v-if="loading.contribution">
                      <v-tooltip right>
                        <img src="/static/img/icon/loading-blocks-200.svg" alt="loading" height="60" slot="activator">
                        <span>{{ transactionMessage1 }}<br />{{ transactionMessage2 }}</span>
                      </v-tooltip>
                    </template>
                    <template v-else>
                      <app-dialog-contribute :playEnable="contribution.enable" :lockstatus="contribution.status" :dialogGame="currentGame" :playerAddress="player.address" :playerContribution="player.contributionBalance"></app-dialog-contribute>
                    </template>
                    <!-- /Dialog -->
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center howitworks-title grey-text title">2. Any contributor can decide to break the Piggy.</div>
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
                          <span>{{ transactionMessage1 }}<br />{{ transactionMessage2 }}</span>
                        </v-tooltip>
                      </template>
                      <template v-else>
                        <app-dialog-break :playEnable="contribution.enable" :lockstatus="contribution.status" :dialogGame="currentGame" :playerBreakEnable="player.breakEnable" @break="onBreakChild"></app-dialog-break>
                      </template>
                      <!-- /Dialog -->
                    </template>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center howitworks-title grey-text title">3. A winner is chosen randomly between the contributors.
                      <!-- <v-tooltip right>
                        <v-icon slot="activator">info_outline</v-icon>
                        <span></span>
                      </v-tooltip> -->
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
                        <span>{{ transactionMessage1 }}<br />{{ transactionMessage2 }}</span>
                      </v-tooltip>
                    </template>
                    <template v-else>
                      <app-dialog-withdraw :playEnable="contribution.enable" :lockstatus="contribution.status" :dialogPlayer="player" @withdraw="onWithdrawChild"></app-dialog-withdraw>
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
      },
      transactionMessage1: 'Your transaction has been submitted successfully.',
      transactionMessage2: 'It will require 50-60 seconds until it gets validated by the whole network.'
    }
  },
  computed: {
    percentage: function () {
      let res
      let min = 0.5
      // console.log("COMPUTED: ", this.ethGame)
      if (!isNaN(this.player.contributionBalance) && !isNaN(this.currentGame.value) && (this.currentGame.value !== 0)) {
        res = Math.max(100 * this.player.contributionBalance / this.currentGame.value, min)
      } else {
        res = min
      }

      return res
    },
    piggyImage: function () {
      if (this.player.contributionBalance > 0) {
        return '/static/img/picto/big-piggy-happy.png'
      } else {
        return '/static/img/picto/big-piggy.png'
      }
    },
    piggyMessage1: function () {
      if (this.player.contributionBalance > 0) {
        return 'Billy is happy since you contributed.'
      } else {
        return 'Billy is sad..'
      }
    },
    piggyMessage2: function () {
      if (this.player.contributionBalance > 0) {
        return 'Contribute more to get more chances to win the lottery!'
      } else {
        return 'Contribute to make him happy ;)'
      }
    }
  },
  mounted () {
    let self = this

    // Check contract config
    if (self.$store.state.contract.address === null && self.$store.state.contract.abi === null) {
      this.getContractConfig().then(function (contract) {
        self.$store.state.contract.address = contract.address
        self.$store.state.contract.abi = JSON.parse(contract.abi)
      })
    }
    // Check if metamask is enabled
    this.loopMetamask()
    // this.checkMetamask()

    // Get current game on firestore
    this.getGame('current')
    // Get current game on ethereum
    // this.getEthPlayerData()
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

/* .parallax-background {
  background-image: url("/static/img/background/background-piggies3.png");
  background-repeat: repeat;
  background-size: 426px 201px;
} */

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
  min-height: 45px;
}

.minimum-contribution {
  font-size:18px;margin: 20px 0 50px 0;
}

.warning-text {
  color: #FDC10A
}

</style>
