<template>
  <div>
    <v-btn
      class="mt-3"
      dark
      large
      @click.native="breakDialog()"
      :class="[breakEnable ? 'pink' : 'grey']"
    >
      Break the Piggy
    </v-btn>
    <v-tooltip right style="top: 5px;">
      <v-icon slot="activator">info_outline</v-icon>
      <span v-html="message"></span>
    </v-tooltip>
    <!-- Countdown -->
    <app-countdown v-if="countdownEnabled" :serverTimestamp="game.serverTimestamp" :breakDatetime="game.breakableAt" @enablebreak="onEnableBreakChild"></app-countdown>
    <!-- /Countdown -->
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Break the Piggy</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex sm12>
                <span v-html="message"></span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import ethereumMixin from '@/mixins/ethereum'
import Countdown from '@/components/Countdown/Countdown.vue'

export default {
  mixins: [
    ethereumMixin
  ],
  components: {
    AppCountdown: Countdown
  },
  props: {
    buttonLarge: true,
    game: null,
    playerBreakEnable: false
  },
  data () {
    return {
      dialog: false,
      breakEnable: false,
      countdownEnabled: false,
      message: 'You need to be a contributor to access this feature.<br/>You can’t break the Piggy if a contribution occurred in the last 3 minutes.'
    }
  },
  watch: {
    game: function (val) {
      this.checkBreak()
    },
    playerBreakEnable: function (val) {
      this.checkBreak()
    }
  },
  methods: {
    // Show dialog
    breakDialog () {
      if (!this.breakEnable) {
        this.dialog = true
      } else {
        // this.$emit('break', true)
        this.breakPiggy()
      }
    },
    // Check break
    checkBreak () {
      // If is breakable
      if (this.playerBreakEnable && this.game.serverTimestamp && this.game.breakableAt) {
        // If time ok
        if (this.game.serverTimestamp > this.game.breakableAt) {
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
    },
    // Break available
    onEnableBreakChild () {
      // If is breakable
      if (this.playerBreakEnable) {
        this.breakEnable = true
        this.countdownEnabled = false
      }
    }
  }
}

</script>

<style scoped>

</style>
