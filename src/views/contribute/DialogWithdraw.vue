<template>
  <div>
    <v-btn
      class="mt-3"
      dark
      large
      slot="activator"
      @click.native="withdrawDialog()"
      :class="[player.withdrawEnable ? 'blue' : 'grey']"
    >
      Withdraw
    </v-btn>
    <v-tooltip right style="top: 5px;">
      <v-icon slot="activator">info_outline</v-icon>
      <span v-html="message"></span>
    </v-tooltip>
    <div>
      Your balance: {{ player.withdrawBalance }} Eth
    </div>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Withdraw</span>
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

export default {
  data () {
    return {
      dialog: false,
      message: 'The more you contribute, the more chances you have to win.<br/>Indeed, your chances to win the lottery are proportional to the total amount of your contributions.'
    }
  },
  props: {
    buttonLarge: true,
    player: null
  },
  methods: {
    // Show dialog
    withdrawDialog () {
      if (!this.player.withdrawEnable) {
        this.dialog = true
      } else {
        // this.$emit('withdraw', true)
        this.withdrawPiggy()
      }
    }
  }
}

</script>

<style scoped>

</style>
