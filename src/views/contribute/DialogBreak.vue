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
      <span style="z-index:10">
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

    <app-metamask-error :metaDialog="metamaskDialog" :lockstatus="lockstatus" @metaerror="closeMetamaskDialog"></app-metamask-error>
    <app-metamask-error :waitDialog="waitDialog" @wait="closeWaitDialog"></app-metamask-error>
  </div>
</template>

<script>

import ethereumMixin from '@/mixins/ethereum'
import MetamaskError from '@/views/error/MetamaskError.vue'

// Timer vars
let timerDuration = 300
let timerBackgroundColor = '#727272'

export default {
  mixins: [
    ethereumMixin
  ],
  components: {
    AppMetamaskError: MetamaskError
  },
  props: {
    buttonLarge: true,
    dialogGame: null,
    playerBreakEnable: false,
    playEnable: true,
    lockstatus: null,
    loading: null
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
      countdownEnabled: false,
      infoMessage: "You need to be a contributor to access this feature.<br/>Furthermore, the Piggy can't be broken if a contribution occured within the last 5 minutes."
    }
  },
  beforeDestroy () {
    // Cancel interval
    clearInterval(this.countdownInterval)
  },
  computed: {
    buttonEnable: function () {
      if (this.playEnable && this.breakEnable && (!this.loading.contribution) && (!this.$store.state.loading.break) && (!this.$store.state.loading.withdraw)) {
        return true
      } else {
        return false
      }
    },
    dialogMessage: function () {
      if (!this.playerBreakEnable) {
        return 'Sorry, you need to contribute to the lottery first, to get access to this feature ;)'
      } else {

        return "The Piggy can't be broken if a contribution occured within the last 5 minutes ;)"
      }
    }
  },
  watch: {
    dialogGame: function (game) {
      // Cancel interval
      clearInterval(this.countdownInterval)

      let limit = timerDuration
      // Calc seconds left
      let secondsLeft = game.breakableAt - this.dialogGame.serverTimestamp
      // If seconds left
      if (secondsLeft > 0) {
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
            if (this.playerBreakEnable) {
              this.breakEnable = true
            }
            clearInterval(this.countdownInterval)
          }
        }, 1000)
      } else if (this.playerBreakEnable) {
        this.breakEnable = true
      }
    },
    playerBreakEnable: function (val) {
      this.checkBreak()
    }
  },
  methods: {
    // Show dialog
    breakAction () {
      if (this.playEnable) {
        if (!this.breakEnable) {
          this.breakDialog = true
        } else {
          if ((!this.loading.contribution) && (!this.$store.state.loading.break) && (!this.$store.state.loading.withdraw)) {
            this.breakPiggy()
          } else {
            this.waitDialog = true
          }
        }
      } else {
        this.metamaskDialog = true // command to show error dialog
      }
    },
    // Check break
    checkBreak () {
      // If is breakable
      if (this.playerBreakEnable && this.dialogGame.serverTimestamp && this.dialogGame.breakableAt) {
        // If time ok
        if (this.dialogGame.serverTimestamp > this.dialogGame.breakableAt) {
          this.breakEnable = true
          this.countdownEnabled = false
        } else {
          this.breakEnable = false
          this.countdownEnabled = true
        }
      } else {
        // Not breakable
        this.breakEnable = false
        this.countdownEnabled = false
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
