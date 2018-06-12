<template>
  <div>
     <!-- contribution.enable -->
    <v-flex v-if="(!buttonLarge) || ((!loading.contribution) && (!loading.break) && (!loading.withdraw))">
      <v-tooltip bottom>
       <v-btn
         class="mt-3"
         :class="[buttonEnable ? 'warning' : 'grey', sizeButton]"
         style="margin-bottom: 50px"
         dark
         large
         slot="activator"
         @click.native="contributeAction()"
       >
         <span>{{ contributeTitle }}</span>
       </v-btn>
       <span>{{ hoverMessage }}</span>
      </v-tooltip>
    </v-flex>

    <v-dialog v-model="dialog" persistent max-width="800px">

      <v-card>
        <v-card-title>
          <span v-if="contributionStatus === 'waitingForContribute'" class="headline grey-text">Contribute</span>
          <span v-if="contributionStatus === 'contributing'" class="headline grey-text">Please confirm the transaction on Metamask..</span>
          <span v-if="contributionStatus === 'contributed'" class="headline grey-text">Transaction submitted successfully!</span>
        </v-card-title>
        <v-card-text>

          <v-container grid-list-md v-if="(contributionStatus === 'waitingForContribute')">
            <v-layout wrap>
              <!-- Ether contribution -->
              <v-flex xs12 sm6>
                <span class="headline grey-text">Your ETH contribution:</span><br />
                <span class="caption" style="color: grey">Minimum contribution: {{ currentGame.minContribution }} ETH</span>
                <v-tooltip right>
                  <v-icon small slot="activator" color="grey">info_outline</v-icon>
                  <span>The minimum contribution can go up or down with time.<br/>It increases when the frequency of player contributions increases.</span>
                </v-tooltip>
              </v-flex>
              <v-flex xs12 sm2>
                <v-text-field type="number" number
                  v-model="localContributionValue" required></v-text-field>
              </v-flex>
              <v-flex v-if="contributionError" xs12 sm12>
                <v-alert outline color="error" icon="warning" :value="true">
                  {{ contributionError }}
                </v-alert>
              </v-flex>
              <!-- <v-flex xs12 sm12 class="caption">
                <span style="color: grey">*Your chances to win the lottery are directly proportional to the amount your contribution(s).</span>
              </v-flex> -->
              <v-flex xs12 sm12>
                <v-btn block color="warning" dark @click.native="contributePiggy(localContributionValue, currentGame.minContribution)">Contribute</v-btn>
              </v-flex>
            </v-layout>
          </v-container>

          <v-container grid-list-md v-if="contributionStatus === 'contributing'">
            <v-flex md12 class="text-xs-center grey-text" style="font-size:28px">
              <img src="/static/img/picto/metamask.png" alt="no metamask" style="max-width: 80px; margin-bottom: 10px">
            </v-flex>
            <v-layout column align-center justify-center style="background-color: white; padding-top: 30px; padding-bottom: 30px" >
              <v-progress-circular :size="60" indeterminate color="warning"></v-progress-circular>
            </v-layout>
          </v-container>

          <v-container grid-list-md v-if="contributionStatus === 'contributed'">
            <v-layout wrap>
              <v-flex xs12 sm12 class="grey--text">
                Congratulations! Your contribution has been submitted successfully. It will require 50-60 seconds until it gets validated by the whole network.<br />
                <br />
              </v-flex>
            </v-layout>

            <v-layout wrap v-if="(registerStatus === 'waitingForRegister') || (registerStatus === 'unregistered')">
              <!-- Email -->
              <v-flex xs12 sm12 class="title grey-text">
                Your email (optional):
              </v-flex>
              <v-flex xs12 sm12 class="grey--text">
                Let us inform you per email in case of victory.
              </v-flex>
              <v-flex xs12 sm4>
                <v-text-field type="text" email :rules="emailRules" label="Your email"
                  v-model="playerEmail" @focus="$event.target.select()"></v-text-field>
              </v-flex>
              <v-flex v-if="registerError" xs12 sm12>
                <v-alert outline color="error" icon="warning" :value="true">
                  {{ contributionError }}
                </v-alert>
              </v-flex>
              <v-flex xs12 sm12>
                <v-btn block color="warning" dark @click.native="registerPlayer()">Register email</v-btn>
              </v-flex>
            </v-layout>

            <v-layout v-if="registerStatus === 'registering'" column align-center justify-center style="background-color: white; padding-top: 30px; padding-bottom: 30px" >
              <v-progress-circular :size="60" indeterminate color="warning"></v-progress-circular>
            </v-layout>

            <v-layout wrap v-if="registerStatus === 'registered'">
              <v-flex xs12 sm12 class="grey--text">
                You will be informed per email in case of victory.
              </v-flex>
            </v-layout>

          </v-container>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="contributionStatus !== 'contributed'" color="blue darken-1" flat @click.native="closeDialog()">Cancel</v-btn>

          <v-btn v-if="(contributionStatus === 'contributed') && (registerStatus !== 'registered')" color="blue darken-1" flat @click.native="closeDialog()">Skip</v-btn>

          <v-btn v-if="(contributionStatus === 'contributed') && (registerStatus === 'registered')" color="blue darken-1" flat @click.native="closeDialog()">Ok</v-btn>
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
import errorMessagesMixin from '@/mixins/errorMessages'
import MetamaskError from '@/views/error/MetamaskError.vue'

export default {
  mixins: [
    firestoreMixin,
    ethereumMixin,
    errorMessagesMixin
  ],
  props: {
    buttonLarge: true
  },
  components: {
    AppMetamaskError: MetamaskError
  },
  data () {
    return {
      contrib: 0,
      apiUrl: process.env.API_URL,
      contributionError: false,
      registerError: false,
      playerEmail: null,
      localContributionValue: 0,
      dialog: false,
      registerStatus: 'waitingForRegister',
      contributionStatus: 'waitingForContribute',
      emailRules: [
        v => {
          return !!v || 'E-mail is required'
        },
        v => this.validEmail(v) || 'E-mail must be valid'
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
    contributeTitle: function () {
      if (this.player.contributionBalance > 0) {
        return 'contribute more'
      } else {
        return 'contribute'
      }
    },
    hoverMessage: function () {
      let message = null
      if ((!this.loading.contribution) && (!this.loading.break) && (!this.loading.withdraw)) {
        if (this.transaction.enable) {
          message = 'Click to ' + this.contributeTitle + '!'
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
    contributeAction () {
      // If able to play

      if ((!this.loading.contribution) && (!this.loading.break) && (!this.loading.withdraw)) {
        if (this.transaction.enable) {
          // Reset contribution
          this.contributionStatus = 'waitingForContribute'
          // this.contributionStatus = 'contributing'

          this.contributionError = false

          this.dialog = true // command to show dialog
          // Get player email
          let self = this
          this.getPlayerEmail(this.player.address).then(function (response) {
            if (self.validEmail(response)) {
              console.log('Valid email registered: ', response)
              self.playerEmail = response
              self.registerStatus = 'registered'
            } else {
              console.log('Invalid email registered: ', response)
              self.registerStatus = 'unregistered'
            }
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
    closeDialog () {
      console.log('Close contribute dialog')
      this.dialog = false
    },
    // Register player
    registerPlayer () {
      let email = this.playerEmail
      let address = this.player.address
      console.log('registerPlayer', email, address)

      let self = this
      if (!this.validEmail(email)) {
        return false
      } else {
        self.registerStatus = 'registering'
      }

      // Call API
      let data = {
        address,
        email,
        notify_victory: true,
        notify_start: true,
        notify_stop: true
      }
      this.$http.post(this.apiUrl + '/user/settings', JSON.stringify(data))
        .then(function (response) {
          // success
          self.registerStatus = 'registered'
          console.log('registered: ', response)
        }, function (response) {
          // error
          self.registerStatus = 'unregistered'
          self.registerError = response
          console.log('error: ', response)
        })
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
