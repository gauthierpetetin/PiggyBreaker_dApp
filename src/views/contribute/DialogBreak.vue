<template>
  <div>
    <v-btn
      class="mt-3"
      dark
      large
      @click.native="breakAction()"
      :class="[buttonEnable ? 'pink' : 'grey']"
      >
      <div v-bind:style="buttonStyle" class="breakButton">
      </div>
      <span style="z-index:2">
        Break the Piggy
      </span>
    </v-btn>
    <v-tooltip right style="top: 5px;">
      <v-icon slot="activator">info_outline</v-icon>
      <span v-html="dialogMessage"></span>
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
                <span class="grey--text" v-html="dialogMessage"></span>
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
import MetamaskError from '@/views/error/MetamaskError.vue'

// Timer vars
let timerDuration = 5 * 60 // 5 minutes
let timerBackgroundColor = '#727272'

export default {
  mixins: [
    ethereumMixin
  ],
  components: {
    AppMetamaskError: MetamaskError
  },
  props: {
    buttonLarge: true
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
      infoMessage: "You need to be a contributor to access this feature.<br/>Furthermore, the Piggy can't be broken if a contribution occured within the last 5 minutes."
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
    dialogMessage: function () {
      let message = null
      if (!this.player.breakEnable) {
        message = 'Sorry, you need to contribute to the lottery first, to get access to this feature ;)'
      } else {
        message = 'The Piggy can\'t be broken if a contribution occured within the last 5 minutes ;)'
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
      // If is breakable
      if (this.player.breakEnable && this.currentGame.serverTimestamp && this.currentGame.breakableAt) {
        this.checkTime()
      } else {
        // Not breakable
        this.breakEnable = false
      }
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
