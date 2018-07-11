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
        @click.native="withdrawAction()"
        :class="[(buttonEnable) ? 'blue' : 'grey', sizeButton]"
        >
        {{ $t('lang.piggy.withdraw.withdrawEarnings') }}
      </v-btn>
      <span>{{ hoverMessage }}</span>
    </v-tooltip>
  </v-flex>

    <div v-if="infos" :class="[(buttonEnable) ? 'blue--text' : 'grey--text']" class="title">
      {{ balanceText }}
    </div>
    <v-dialog v-model="withdrawDialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline grey-text">{{ $t('lang.piggy.withdraw.dialogTitle') }}</span>
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
  props: {
    buttonLarge: true,
    buttonNormal: false,
    buttonSmall: true,
    infos: false
  },
  data () {
    return {
      withdrawDialog: false,
      dialogMessage: this.$t('lang.piggy.withdraw.dialogMessage'),
      infoMessage: this.$t('lang.piggy.withdraw.infoMessage')
    }
  },
  computed: {
    balanceText () {
      if (this.buttonEnable) {
        return this.$t('lang.piggy.withdraw.yourEarnings') + this.player.withdrawBalance + ' ETH'
      }
    },
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
          if (!this.player.withdrawEnable) {
            message = this.$t('lang.piggy.withdraw.withdrawEnable.sorryNoFunds')
          } else {
            message = this.$t('lang.piggy.withdraw.withdrawEnable.clickToWithdraw')
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

.normal-contribute-button {
  width: 200px;
}

.small-contribute-button {
  font-size: 12px !important;
  height: 30px;
  width: 170px !important;
}

</style>
