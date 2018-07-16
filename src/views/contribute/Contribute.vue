<template>
  <div>
    <!-- Contribute -->
    <section>
      <!-- <v-parallax class="parallax-background"> -->
      <v-layout column align-center justify-center style="background-color: white" >
        <v-tooltip right>
          <h1 slot="activator" class="pink--text mb-2 display-2 text-xs-center current" style="margin-top: 35px">{{ $t('lang.piggy.currentPiggyValue') }} <strong><span>{{ currentGame.value | round(2) }}</span> ETH</strong></h1>
          <span> {{ currentGame.value }} ETH </span>
        </v-tooltip>
        <v-tooltip right>
          <img :src="piggyImage" alt="big piggy" height="350" style="margin-top: 15px" slot="activator">
          <span> {{piggyMessage1}} <br /> {{piggyMessage2}} </span>
        </v-tooltip>
      </v-layout>
      <!-- Loading -->
      <section v-if="transaction.checked == false">
        <v-layout column align-center justify-center style="background-color: white; padding-top: 30px; padding-bottom: 30px" >
          <v-progress-circular :size="60" indeterminate color="warning"></v-progress-circular>
        </v-layout>
      </section>
      <!-- /Loading -->
      <section v-else>
        <!-- Locked -->
        <v-layout v-if="!transaction.enable" row wrap class="white--text">
          <app-locked :lockstatus="transaction.status"></app-locked>
        </v-layout>
        <!-- /Locked -->
        <!-- Contribution -->
        <v-layout v-if="transaction.enable" column align-center justify-center style="background-color: white" >
          <!-- Player contribution amount -->
          <section style="margin-top: 15px; min-width: 40%">
            <h1 class="mb-2 headline text-xs-center contribution">

                <template v-if="loading.contribution">
                  <v-flex class="my-3">
                    <span class="grey--text">{{ $t('lang.piggy.yourCurrentContribution') }}</span>
                  </v-flex>
                  <v-flex class="my-3">
                    <v-tooltip right>
                      <img src="/static/img/icon/loading-blocks-200.svg" alt="loading" height="60" slot="activator">
                      <span v-html="$t('lang.piggy.yourContributionHasBeenSubmittedItWillRequire5060Seconds')"></span>
                    </v-tooltip>
                  </v-flex>
                </template>

                <template v-else>
                  <v-flex class="my-3">
                    <v-tooltip right>
                      <div slot="activator" class="grey--text">
                        <span>{{ $t('lang.piggy.yourCurrentContribution') }}</span>
                        <span>{{ player.contributionBalance | round(2) }} ETH</span>
                      </div>
                      <span>{{ player.contributionBalance }} ETH</span>
                    </v-tooltip>
                  </v-flex>
                  <v-flex class="my-3">
                    <v-progress-linear :value="percentage" height="20" color="grey"></v-progress-linear>
                  </v-flex>
                </template>
            </h1>
          </section>
          <!-- /Player contribution amount -->
        </v-layout>
        <!-- /Contribution -->

        <v-layout v-if="transaction.enable" row wrap class="white--text" style="background-color: white">
          <!-- Player contribute -->
          <v-flex md12 class="text-xs-center">
            <app-dialog-contribute button-large="true"></app-dialog-contribute>
          </v-flex>
          <!-- view pending transaction-->
          <v-flex v-if="(loading.contribution) || (loading.break) || (loading.withdraw)" md12 class="text-xs-center grey-text" style="font-size:28px; margin-bottom: 50px">
            <v-btn class="mt-3 blue" dark large target="_blank" @click.native="viewPendingTx($store.state.ethPendingTx)">
              <span>{{ $t('lang.piggy.contribute.viewPendingTransaction') }}</span>
            </v-btn>
          </v-flex>
          <!-- /Player contribute -->
        </v-layout>
      </section>
      <!-- </v-parallax> -->
    </section>
    <!-- What is Piggy Breaker -->
    <section>
      <v-parallax  class="parallax-background" height="550">
        <v-layout column align-center justify-center>
          <div style="width: 80%; height: 400px; padding: 1% 2%; background-color: white">
          <v-flex class="my-3">
            <div class="text-xs-center">
              <h4 class="display-1 pink--text small-text" style="padding: 10px 0">{{ $t('lang.piggy.piggyIsTheNextWorldLottery.piggyBreakerIsTheNextWorldLottery') }}</h4>
            </div>
          </v-flex>
          <div class="headline mb-3 text-xs-center title">
            <p>
              {{ $t('lang.piggy.piggyIsTheNextWorldLottery.theGameIsCenteredAroundBilly') }}
            </p>
            <img src="/static/img/picto/piggy-growth.png" alt="piggy growth" height="120" style="margin-top: 15px; margin-bottom: 15px">
            <p><br>
              {{ $t('lang.piggy.piggyIsTheNextWorldLottery.somedayThePiggyBankWillBreak') }}
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
            <h2 class="display-1 grey-text" style="margin-top: 25px">{{ $t('lang.piggy.howDoesItWork.howDoesItWork') }}</h2>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center howitworks-title grey-text title" height="50">{{ $t('lang.piggy.howDoesItWork.1YouContributeWithEthers') }}</div>
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
                      <app-dialog-contribute button-normal="true"></app-dialog-contribute>
                    </template>
                    <!-- /Dialog -->
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center howitworks-title grey-text title" height="50">{{ $t('lang.piggy.howDoesItWork.2AnyContributorCanDecideToBreak') }}</div>
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
                        <app-dialog-break button-normal="true" infos="true"></app-dialog-break>
                      </template>
                      <!-- /Dialog -->
                    </template>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center howitworks-title grey-text title" height="50">{{ $t('lang.piggy.howDoesItWork.3AWinnerIsChosenRandomly') }}
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
                      <app-dialog-withdraw button-normal="true" infos="true"></app-dialog-withdraw>
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
      transactionMessage1: this.$t('lang.piggy.transaction.message1'),
      transactionMessage2: this.$t('lang.piggy.transaction.message2')
    }
  },
  methods: {
    isNumber (n) {
      return !isNaN(parseFloat(n)) && !isNaN(n - 0)
    },
    viewPendingTx (txHash) {
      let txLink = this.explorerAddress + txHash
      window.open(txLink, '_blank')
    }
  },
  computed: {
    explorerAddress () {
      let expAddress = ''
      if (this.$store.state.contract.address) {
        if (process.env.ETHEREUM_NODE_ENV === 'development') {
          expAddress = this.$store.state.explorer.transaction.ropsten
        } else {
          expAddress = this.$store.state.explorer.transaction.mainnet
        }
      }
      return expAddress
    },
    percentage: function () {
      let res
      let min = 0.5
      // console.log('percentage - this.player.contributionBalance', this.player.contributionBalance)
      // console.log('percentage - this.currentGame.value', this.currentGame.value)
      // if (this.isNumber(this.player.contributionBalance)) {
      //   console.log('isNumber1')
      // }
      // if (this.isNumber(this.currentGame.value)) {
      //   console.log('isNumber2')
      // }
      if ((!this.isNumber(this.player.contributionBalance)) || (!this.isNumber(this.currentGame.value))) {
        res = min
        // console.log('res1', res)
      } else {
        if (parseFloat(this.currentGame.value) === 0) {
          res = min
          // console.log('res2', res)
        } else {
          res = Math.max(100 * this.player.contributionBalance / this.currentGame.value, min)
          // console.log('res3', res)
        }
      }
      return res
    },
    piggyImage: function () {
      if ((this.currentGame.value === 0) || (this.currentGame.value === '0')) {
        return '/static/img/picto/big-piggy-empty.png'
      } else if (this.player.contributionBalance > 0) {
        return '/static/img/picto/big-piggy_Smiley-1.png'
      } else {
        return '/static/img/picto/big-piggy.png'
      }
    },
    piggyMessage1: function () {
      if (this.player.contributionBalance > 0) {
        // return 'Billy is happy since you contributed.'
        return this.$t('lang.piggy.message.billyIs.happy')
      } else {
        // return 'Billy is sad...'
        return this.$t('lang.piggy.message.billyIs.sad')
      }
    },
    piggyMessage2: function () {
      if (this.player.contributionBalance > 0) {
        // return 'Contribute more to get more chances to win the lottery!'
        return this.$t('lang.piggy.message.contribute.moreChance')
      } else {
        // return 'Contribute to make him happy ;)'
        return this.$t('lang.piggy.message.contribute.makeHappy')
      }
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
