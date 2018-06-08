<template>
  <div>
    <v-tooltip bottom>
      <v-btn
        class="mt-3"
        dark
        large
        slot="activator"
        @click.native="withdrawAction()"
        :class="[(buttonEnable) ? 'blue' : 'grey']"
      >
        Withdraw
      </v-btn>
      <span>{{ hoverMessage }}</span>
    </v-tooltip>

    <!-- <v-tooltip right style="top: 5px; z-index: 3">
      <v-icon slot="activator">info_outline</v-icon>
      <span v-html="infoMessage"></span>
    </v-tooltip> -->
    <div class="grey--text">
      Your balance: {{ player.withdrawBalance }} Eth
    </div>
    <v-dialog v-model="withdrawDialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline grey-text">Withdraw</span>
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
          <v-btn color="blue darken-1" flat @click.native="withdrawDialog = false">Ok</v-btn>
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

export default {
  mixins: [
    ethereumMixin,
    errorMessagesMixin
  ],
  data () {
    return {
      withdrawDialog: false,
      dialogMessage: "You have no funds to withdraw for now.<br />Press 'Contribute' to get a chance to win the next lottery ;)",
      infoMessage: 'The more you contribute, the more chances you have to win:<br/>Your chances to win the lottery are proportional to the total amount of your contributions.'
    }
  },
  computed: {
    currentGame () {
      return this.$store.state.fbCurrentGame
    },
    buttonEnable: function () {
      if (this.transaction.enable && this.player.withdrawEnable && (!this.loading.contribution) && (!this.loading.break) && (!this.loading.withdraw)) {
        return true
      } else {
        return false
      }
    },
    hoverMessage: function () {
      let message = null
      if ((!this.loading.contribution) && (!this.loading.break) && (!this.loading.withdraw)) {
        if (this.transaction.enable) {
          if (!this.player.withdrawEnable) {
            message = 'Sorry, you have no funds to withdraw for now..'
          } else {
            message = 'Click to withdraw your Ethers now!'
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
  methods: {
    // Show dialog
    withdrawAction () {
      if ((!this.loading.contribution) && (!this.loading.break) && (!this.loading.withdraw)) {
        if (this.transaction.enable) {
          if (!this.player.withdrawEnable) {
            this.withdrawDialog = true
          } else {
            this.withdrawPiggy()
          }
        } else {
          this.metamaskDialog = true // command to show error dialog
        }
      } else {
        this.waitDialog = true
      }
    }
  },
  components: {
    AppMetamaskError: MetamaskError
  }
}

</script>

<style scoped>

</style>
