<template>
  <div>
    <v-btn
      class="mt-3"
      dark
      large
      @click.native="breakDialog()"
      :class="[player.breakEnable ? 'blue' : 'grey']"
    >
      Break the Piggy
    </v-btn>
    <v-tooltip right style="top: 5px;">
      <v-icon slot="activator">info_outline</v-icon>
      <span v-html="message"></span>
    </v-tooltip>
    <!-- Countdown -->
    <app-countdown v-if="piggy.breakTimerEnable" class="remaining-time" :date="piggy.nextContributionTime" @enablebreak="onEnableBreakChild"></app-countdown>
    <!-- /Countdown -->
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Break the Piggy</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>4
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

export default {
  data () {
    return {
      dialog: false,
      breakEnable: false,
      message: 'You need to be a contributor to access this feature.<br/>You can’t break the Piggy if a contribution occurred in the last 3 minutes.'
    }
  },
  props: {
    buttonLarge: true,
    piggy: null,
    player: null
  },
  computed: {
    classButton: function () {
      return {
        'contribute-button': this.buttonLarge
      }
    }
  },
  components: {
    AppCountdown: Countdown
  },
  mounted () {
    // this.initialize()
  },
  methods: {
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
      this.player.breakEnable = true
      this.piggy.breakTimerEnable = false
    }
  }
}

</script>

<style scoped>

.contribute-button {
  font-size: 42px;
}

</style>
