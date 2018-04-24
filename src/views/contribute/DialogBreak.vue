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
    <app-countdown v-if="countdownEnabled" class="remaining-time" :serverTimestamp="game.serverTimestamp" :breakDatetime="game.breakableAt" @enablebreak="onEnableBreakChild"></app-countdown>
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

import Countdown from '@/components/Countdown/Countdown.vue'

import firestoreMixin from '@/mixins/firestore'

export default {
  mixins: [
    firestoreMixin
  ],
  props: {
    buttonLarge: true,
    game: null,
    player: null
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
    }
  },
  computed: {
    classButton: function () {
      return {
        'contribute-button': this.buttonLarge
      }
    }
  },
  mounted () {
    this.checkBreak()
  },
  methods: {
    // Check break
    checkBreak () {
      // Check button enable
      if (this.game.breakable && this.player.breakEnable) {
        this.breakEnable = true
      }

      console.log('this.game.breakable', this.game.breakable)
      console.log('this.player.breakEnable', this.player.breakEnable)

      // Check countdown enable
      if (this.game.breakableAt > this.game.serverTimestamp) {
        this.countdownEnabled = true
        this.breakEnable = false
      } else {
        this.countdownEnabled = false
      }
    },
    // Show dialog
    breakDialog () {
      if (!this.player.breakEnable) {
        this.dialog = true
      } else {
        this.$emit('break', true)
      }
    },
    // Break available
    onEnableBreakChild () {
      if (this.game.breakable && this.player.breakEnable) {
        this.breakEnable = true
      }
      this.countdownEnabled = false
    }
  },
  components: {
    AppCountdown: Countdown
  }
}

</script>

<style scoped>

.contribute-button {
  font-size: 42px;
}

</style>
