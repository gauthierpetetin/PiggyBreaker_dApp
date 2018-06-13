<template>
  <div>
    <v-tooltip bottom>
      <v-btn
        class="mt-3"
        dark
        large
        slot="activator"
        @click.native="breakAction()"
        :class="[buttonEnable ? 'pink' : 'grey']"
        >
        <div v-bind:style="buttonStyle" class="breakButton">
        </div>
        <span style="z-index:2">
          Break the Piggy
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

    <v-dialog v-model="breakDialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline grey-text">Break the Piggy</span>
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
let timerBackgroundColor = '#727272'

export default {
  mixins: [
    ethereumMixin,
    errorMessagesMixin
  ],
  components: {
    AppMetamaskError: MetamaskError
  },
  props: {
    buttonLarge: true,
    infos: false
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
      breakEnable: false,
      dialogMessage0: 'Be patient.. ;) The Piggy is protected for 5 minutes after someone contributes.',
      dialogMessage1: 'TWO RULES protect the Piggy:',
      dialogMessage2: ' 1) Only a contributor can break it.',
      dialogMessage3: ' 2) The Piggy is protected for 5 minutes after each contribution.'
    }
  },
  mounted () {
    this.checkBreak()
  },
  beforeDestroy () {
    // Cancel interval
    clearInterval(this.countdownInterval)
  },
  computed: {
    currentGame () {
      return this.$store.state.fbCurrentGame
    },
    buttonEnable: function () {
      if (this.breakEnable && this.transaction.enable && (!this.loading.contribution) && (!this.loading.break) && (!this.loading.withdraw)) {
        return true
      } else {
        return false
      }
    },
    hoverMessage: function () {
      let message = null
      if ((!this.loading.contribution) && (!this.loading.break) && (!this.loading.withdraw)) {
        if (this.transaction.enable) {
          if (!this.breakEnable) {
            if (!this.player.breakEnable) {
              message = 'Sorry, you need to contribute first.'
            } else {
              message = this.dialogMessage0
            }
          } else {
            message = 'Click to break the Piggy!'
          }
        } else {
          message = this.metamaskMessage(this.transaction.status) + ' first.'
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
    }
  },
  methods: {
    // Show dialog
    breakAction () {
      if ((!this.loading.contribution) && (!this.loading.break) && (!this.loading.withdraw)) {
        if (this.transaction.enable) {
          if (!this.breakEnable) {
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
    checkBreak () {
      console.log('CHECKBREAK : ', this.player.breakEnable)
      // If is breakable
      if (this.player.breakEnable && this.currentGame.serverTimestamp && this.currentGame.breakableAt) {
        this.checkTime()
      } else {
        // Not breakable
        this.breakEnable = false
        this.initButton()
      }
    },
    initButton () {
      clearInterval(this.countdownInterval)
      this.buttonStyle.width = 0
    },
    checkTime () {
      console.log('CHECKTIME')
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
        this.breakEnable = false
        this.buttonStyle.backgroundColor = timerBackgroundColor
        this.countdownInterval = window.setInterval(() => {
          // Calc percents
          let percents = 100 - Math.floor(secondsLeft / limit * 100)
          if (percents > 0) {
            this.buttonStyle.width = percents + '%'
          }
          // Reduce seconds
          secondsLeft -= 1
          // Clear interval
          if (secondsLeft < 0) {
            this.buttonStyle.backgroundColor = null
            if (this.player.breakEnable) {
              this.breakEnable = true
            }
            clearInterval(this.countdownInterval)
          }
        }, 1000)
      } else if (this.player.breakEnable) {
        console.log('br true')
        this.breakEnable = true
      }
    }
  }
}

</script>

<style scoped>
  .breakButton {
    left: 0px;
    top: 0px;
    position: absolute;
    height: 100%;
    z-index: 1;
  }
</style>
