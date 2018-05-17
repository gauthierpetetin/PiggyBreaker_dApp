<template>
  <div>
     <!-- contribution.enable -->
    <v-btn
      class="mt-3"
      :class="[buttonEnable ? 'warning' : 'grey', sizeButton]"
      style="margin-bottom: 50px"
      dark
      large
      slot="activator"
      @click.native="contributeAction()"
    >
      <span v-if="positiveContribution">Contribute more</span>
      <span v-else>Contribute</span>
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="800px">

      <v-card>
        <v-card-title>
          <span v-if="contributionStatus === 'contributing'" class="headline grey-text">Contribute</span>
          <span v-if="contributionStatus === 'contributed'" class="headline grey-text">Transation submitted successfully!</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md v-if="contributionStatus === 'contributing'">
            <v-layout wrap>
              <!-- Ether contribution -->
              <v-flex xs12 sm6>
                <span class="headline grey-text">Your ETH contribution*:</span><br />
                <span class="caption" style="color: grey">Minimum contribution: {{ currentGame.minContribution }} ETH</span>
                <v-tooltip right style="z-index: 3">
                  <v-icon small slot="activator" color="grey">info_outline</v-icon>
                  <span>The minimum contribution can go up or down with time.<br/>It increases when the frequency of player contributions increases.</span>
                </v-tooltip>
              </v-flex>
              <v-flex xs12 sm2>
                <v-text-field type="number" number
                  v-model="player.contributionValue" required></v-text-field>
              </v-flex>
              <v-flex v-if="contributionError" xs12 sm12>
                <v-alert outline color="error" icon="warning" :value="true">
                  {{ contributionError }}
                </v-alert>
              </v-flex>
              <v-flex xs12 sm12 class="caption">
                <span style="color: grey">*Your chances to win the lottery are directly proportional to the amount your contribution(s).</span>
              </v-flex>
              <v-flex xs12 sm12>
                <v-btn block color="warning" dark @click.native="contributePiggy(currentGame.minContribution)">Contribute</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container grid-list-md v-if="contributionStatus === 'contributed'">
            <v-layout wrap>
              <v-flex xs12 sm12 class="grey--text">
                Congratulations! Your contribution has been submitted successfully. It will require 50-60 seconds until it gets validated by the whole network.<br />
                <br />
              </v-flex>
            </v-layout>
            <v-layout wrap v-if="registerStatus === 'unregistered' ">
              <!-- Email -->
              <v-flex xs12 sm12 class="title grey-text">
                Your email (optional):
              </v-flex>
              <v-flex xs12 sm12 class="grey--text">
                Let us inform you per email in case of victory.
              </v-flex>
              <v-flex xs12 sm4>
                <v-text-field type="text" email :rules="emailRules"
                  v-model="playerEmail"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <v-btn block color="warning" dark @click.native="registerPlayer()">Register email</v-btn>
              </v-flex>
            </v-layout>
            <v-layout wrap v-if="registerStatus === 'registered' ">
              <v-flex xs12 sm12 class="grey--text">
                You will be informed per email in case of victory.
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="contributionStatus === 'contributing'" color="blue darken-1" flat @click.native="dialog = false">Cancel</v-btn>
          <v-btn v-if="contributionStatus === 'contributed' && registerStatus === 'unregistered'" color="blue darken-1" flat @click.native="dialog = false">Skip</v-btn>
          <v-btn v-if="contributionStatus === 'contributed' && registerStatus === 'registered'" color="blue darken-1" flat @click.native="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <app-metamask-error :metaDialog="metamaskDialog" :lockstatus="transaction.status" @metaerror="closeMetamaskDialog"></app-metamask-error>
    <app-metamask-error :waitDialog="waitDialog" @wait="closeWaitDialog"></app-metamask-error>
  </div>
</template>

<script>
import firestoreMixin from '@/mixins/firestore'
import ethereumMixin from '@/mixins/ethereum'
import MetamaskError from '@/views/error/MetamaskError.vue'

export default {
  mixins: [
    firestoreMixin,
    ethereumMixin
  ],
  props: {
    buttonLarge: true
  },
  components: {
    AppMetamaskError: MetamaskError
  },
  data () {
    return {
      apiUrl: process.env.API_URL,
      dialog: false,
      contributionStatus: 'contributing',
      registerStatus: 'unregistered',
      contributionError: false,
      emailError: false,
      playerEmail: null,
      emailRules: [
        v => {
          return !!v || 'E-mail is required'
        },
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  computed: {
    currentGame () {
      return this.$store.state.fbCurrentGame
    },
    buttonEnable: function () {
      if (this.transaction.enable && (!this.loading.contribution) && (!this.loading.break) && (!this.loading.withdraw)) {
        return true
      } else {
        return false
      }
    },
    sizeButton: function () {
      return {
        'big-contribute-button': this.buttonLarge
      }
    },
    positiveContribution: function () {
      console.log('Positive contribution ? ', this.player.contributionBalance)
      if (this.player.contributionBalance > 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // Show dialog
    contributeAction () {
      // Reset contribution
      this.contributionStatus = 'contributing'
      this.contributionError = false

      // If able to play

      if ((!this.loading.contribution) && (!this.loading.break) && (!this.loading.withdraw)) {
        if (this.transaction.enable) {
          this.dialog = true // command to show dialog
          // Get player email
          let self = this
          this.getPlayerEmail(this.player.address).then(function (response) {
            console.log('Address registered: ', response)
            self.playerEmail = response
            self.registerStatus = 'registered'
          }, function (error) {
            if (error) {
              console.log('Address not registered')
              self.registerStatus = 'unregistered'
            }
          })
        } else {
          this.metamaskDialog = true // command to show error dialog
        }
      } else {
        this.waitDialog = true
      }
    },
    // Register player
    registerPlayer () {
      let email = this.player.email
      if (!this.validEmail(email)) {
        return false
      }
      // Call API
      let data = {
        email: email
      }
      this.$http.post(this.apiUrl + '/user/register', JSON.stringify(data))
        .then(function (response) {
          // success
        }, function (response) {
          // error
          console.log('error', response.body.status)
        })

      // this.contributionStatus = 'registered'
    },
    validEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  }
}
</script>

<style scoped>

.big-contribute-button {
  font-size: 36px;
  height: 75px;
  width: 40%;
}

.disabled-contribute-button {
  background-color: grey !important;
  height: 250px !important;
}

</style>
