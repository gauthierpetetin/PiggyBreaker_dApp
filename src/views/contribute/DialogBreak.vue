<template>
  <div>
    <v-flex>
      <v-tooltip bottom>
        <v-btn
        class="mt-3"
        dark
        large
        style="width: 220px"
        slot="activator"
        @click.native="breakAction()"
        :class="[buttonEnable ? 'pink' : 'grey', sizeButton]"
        >
        <div v-bind:style="buttonStyle" class="breakButton">
        </div>
        <span style="z-index:2">
          {{$t('lang.piggy.break.title')}}
        </span>
      </v-btn>
      <span>{{ hoverMessage }}</span>
    </v-tooltip>
    <v-tooltip v-if="infos" right style="top: 5px;">
      <v-icon slot="activator">info_outline</v-icon>
      <span v-html="dialogMessage1"></span><br />
      <ul>
        <li class="padli"><span v-html="dialogMessage2"></span></li>
        <li class="padli"><span v-html="dialogMessage3"></span><br /></li>
      </ul>
    </v-tooltip>
  </v-flex>

    <v-dialog v-model="breakDialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline grey-text">{{$t('lang.piggy.break.breakThePiggy')}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex sm12>
                <span class="grey--text" v-html="hoverMessage"></span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="breakDialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <app-metamask-error :metaDialog="metamaskDialog" :lockstatus="transaction.status" @metaerror="closeMetamaskDialog"></app-metamask-error>
    <app-metamask-error :waitDialog="waitDialog" @wait="closeWaitDialog"></app-metamask-error>
  </div>
</template>

<script>

import ethereumMixin from '@/mixins/ethereum'
import errorMessagesMixin from '@/mixins/errorMessages'
import MetamaskError from '@/views/error/MetamaskError.vue'

// Timer vars
let timerDuration = 5 * 60 // 5 minutes
let defaultBackgroundColor = '#727272'

export default {
  mixins: [
    ethereumMixin,
    errorMessagesMixin
  ],
  components: {
    AppMetamaskError: MetamaskError
  },
  props: {
    buttonLarge: false,
    buttonNormal: false,
    buttonSmall: false,
    infos: false,
    masterTimerButton: false
  },
  data () {
    return {
      countdownInterval: null,
      buttonWidth: 0,
      buttonStyle: {
        width: '0%'
        // backgroundColor: '#727272'
      },
      breakDialog: false,
      dialogMessage0: this.$t('lang.piggy.break.dialogMessage[0]'),
      dialogMessage1: this.$t('lang.piggy.break.dialogMessage[1]'),
      dialogMessage2: this.$t('lang.piggy.break.dialogMessage[2]'),
      dialogMessage3: this.$t('lang.piggy.break.dialogMessage[3]')
    }
  },
  mounted () {
    this.checkBreak()
    this.refreshButton()
  },
  beforeDestroy () {
    // Cancel interval
    clearInterval(this.countdownInterval)
  },
  computed: {
    currentGame () {
      return this.$store.state.fbCurrentGame
    },
    gameBreakEnable () {
      return this.$store.state.gameBreakEnable
    },
    timerBackgroundColor () {
      return this.$store.state.timerBackgroundColor
    },
    buttonEnable: function () {
      if (this.gameBreakEnable && this.transaction.enable && (!this.loading.contribution) && (!this.loading.break) && (!this.loading.withdraw)) {
        return true
      } else {
        return false
      }
    },
    sizeButton: function () {
      return {
        'big-contribute-button': this.buttonLarge,
        'normal-contribute-button': this.buttonNormal,
        'small-contribute-button': this.buttonSmall
      }
    },
    hoverMessage: function () {
      let message = null
      if ((!this.loading.contribution) && (!this.loading.break) && (!this.loading.withdraw)) {
        if (this.transaction.enable) {
          if (!this.gameBreakEnable) {
            if (!this.player.breakEnable) {
              message = this.$t('lang.piggy.break.hoverMessage.contribute')
            } else {
              message = this.dialogMessage0
            }
          } else {
            message = this.$t('lang.piggy.break.hoverMessage.click')
          }
        } else {
          if (this.$i18n.locale === 'cn') { // Le first est à la fin de la phrase en anglais et au début de la phrase en chinois
            message = this.$t('lang.piggy.break.first') + this.metamaskMessage(this.transaction.status)
          } else {
            message = this.metamaskMessage(this.transaction.status) + this.$t('lang.piggy.break.first')
          }
        }
      } else {
        message = this.waitMessage
      }
      return message
    }
  },
  watch: {
    'player.breakEnable': function (val) {
      this.checkBreak()
    },
    'currentGame.serverTimestamp': function (val) {
      this.checkBreak()
    },
    'currentGame.breakableAt': function (val) {
      this.checkBreak()
    },
    '$store.state.percentage': function (val) {
      this.refreshButton()
    },
    '$store.state.timerBackgroundColor': function (val) {
      this.refreshButton()
    }
  },
  methods: {
    // Show dialog
    refreshButton () {
      this.buttonStyle.width = this.$store.state.percentage + '%'
      this.buttonStyle.backgroundColor = this.$store.state.timerBackgroundColor
    },
    breakAction () {
      if ((!this.loading.contribution) && (!this.loading.break) && (!this.loading.withdraw)) {
        if (this.transaction.enable) {
          if (!this.gameBreakEnable) {
            this.breakDialog = true
          } else {
            this.breakPiggy()
          }
        } else {
          this.metamaskDialog = true // command to show error dialog
        }
      } else {
        this.waitDialog = true
      }
    },
    // Check break
    checkBreak () { // ONLY FOR MASTER BUTTON
      if (this.masterTimerButton) {
        console.log('CHECKBREAK (', this.buttonSmall, '): ', this.player.breakEnable)
        // If is breakable
        if (this.player.breakEnable && this.currentGame.serverTimestamp && this.currentGame.breakableAt) {
          this.checkTime()
        } else {
          // Not breakable
          this.$store.state.gameBreakEnable = false
          this.initButton()
        }
      }
    },
    initButton () { // ONLY FOR MASTER BUTTON
      if (this.masterTimerButton) {
        clearInterval(this.countdownInterval)
        // this.buttonStyle.width = 0
        this.$store.state.percentage = 0
      }
    },
    checkTime () {
      if (this.masterTimerButton) {
        console.log('Checktime')
        // Cancel interval
        clearInterval(this.countdownInterval)

        let limit = timerDuration
        // Calc seconds left
        let secondsLeft = this.currentGame.breakableAt - this.currentGame.serverTimestamp
        // If seconds left
        console.log('this.currentGame.breakableAt: ', this.currentGame.breakableAt)
        console.log('this.currentGame.serverTimestamp', this.currentGame.serverTimestamp)
        console.log('secondsLeft: ', secondsLeft)
        if (secondsLeft > 0) {
          console.log('br false')
          this.$store.state.gameBreakEnable = false
          this.$store.state.timerBackgroundColor = defaultBackgroundColor
          this.countdownInterval = window.setInterval(() => {
            // Calc percents
            let percents = 100 - Math.floor(secondsLeft / limit * 100)
            if (percents > 0) {
              this.$store.state.percentage = percents
            }
            // Reduce seconds
            secondsLeft -= 1
            // Clear interval
            if (secondsLeft < 0) {
              this.$store.state.timerBackgroundColor = null
              if (this.player.breakEnable) {
                this.$store.state.gameBreakEnable = true
              }
              clearInterval(this.countdownInterval)
            }
          }, 1000)
        } else if (this.player.breakEnable) {
          console.log('br true')
          this.$store.state.gameBreakEnable = true
        }
      }
    }
  }
}

</script>

<style scoped>

  .normal-contribute-button {
    width: 200px;
  }

  .small-contribute-button {
    font-size: 12px !important;
    height: 30px;
    width: 170px !important;
  }

  .breakButton {
    left: 0px;
    top: 0px;
    position: absolute;
    height: 100%;
    z-index: 1;
  }
</style>
