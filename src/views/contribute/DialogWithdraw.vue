<template>
  <div>
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
    <v-tooltip right style="top: 5px;">
      <v-icon slot="activator">info_outline</v-icon>
      <span v-html="infoMessage"></span>
    </v-tooltip>
    <div class="grey--text">
      Your balance: {{ dialogPlayer.withdrawBalance }} Eth
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

    <app-metamask-error :metaDialog="metamaskDialog" :lockstatus="lockstatus" @metaerror="closeMetamaskDialog"></app-metamask-error>
    <app-metamask-error :waitDialog="waitDialog" @wait="closeWaitDialog"></app-metamask-error>
  </div>
</template>

<script>

import ethereumMixin from '@/mixins/ethereum'
import MetamaskError from '@/views/error/MetamaskError.vue'

export default {
  mixins: [
    ethereumMixin
  ],
  data () {
    return {
      withdrawDialog: false,
      dialogMessage: "You have no funds to withdraw for now.<br />Press 'Contribute' to get a chance to win the next lottery ;)",
      infoMessage: 'The more you contribute, the more chances you have to win.<br/>Indeed, your chances to win the lottery are proportional to the total amount of your contributions.'
    }
  },
  props: {
    buttonLarge: true,
    dialogPlayer: null,
    playEnable: true,
    lockstatus: null,
    loading: null
  },
  computed: {
    buttonEnable: function () {
      console.log('Withdraw buttonEnable : ', this.loading)
      if (this.playEnable && this.dialogPlayer.withdrawEnable && (!this.loading.contribution) && (!this.loading.break) && (!this.loading.withdraw)) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // Show dialog
    withdrawAction () {
      if (this.playEnable) {
        if (!this.dialogPlayer.withdrawEnable) {
          this.withdrawDialog = true
        } else {
          if ((!this.loading.contribution) && (!this.loading.break) && (!this.loading.withdraw)) {
            this.withdrawPiggy()
          } else {
            this.waitDialog = true
          }
        }
      } else {
        this.metamaskDialog = true // command to show error dialog
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
