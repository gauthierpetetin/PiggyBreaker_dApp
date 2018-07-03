<template>
  <div>
     <!-- contribution.enable -->
    <v-flex v-if="(!buttonLarge) || ((!loading.contribution) && (!loading.break) && (!loading.withdraw))">
      <v-tooltip bottom>
       <v-btn
         class="mt-3"
         :class="[buttonEnable ? 'warning' : 'grey', sizeButton]"
         style="width: 220px;"
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
          <span v-if="contributionStatus === 'waitingForContribute'" class="headline grey-text">{{ $t('lang.piggy.contribute.status.contribute') }}</span>
          <span v-if="contributionStatus === 'contributing'" class="headline grey-text">{{ $t('lang.piggy.contribute.status.pleaseConfirmTheTransaction') }}</span>
          <span v-if="contributionStatus === 'contributed'" class="headline grey-text">{{ $t('lang.piggy.contribute.status.transactionSubmittedSuccessfully') }}</span>
        </v-card-title>
        <v-card-text>

          <v-container grid-list-md v-if="(contributionStatus === 'waitingForContribute')">
            <v-layout wrap>
              <!-- Ether contribution -->
              <v-flex xs12 sm6>
                <span class="headline grey-text">{{ $t('lang.piggy.contribute.contribution.yourETHContribution') }}</span><br />
                <span class="caption" style="color: grey">{{ $t('lang.piggy.contribute.contribution.minimumContribution') }} {{ currentGame.minContribution }} ETH</span>
                <v-tooltip right>
                  <v-icon small slot="activator" color="grey">info_outline</v-icon>
                  <span v-html="$t('lang.piggy.contribute.contribution.theMinimumContributionCanGoUpOrDown')"></span>
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
                <v-btn block color="warning" dark @click.native="contributePiggy(localContributionValue, currentGame.minContribution)">{{ $t('lang.piggy.contribute.title.contribute') }}</v-btn>
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
                {{ $t('lang.piggy.contribute.congratulationsYourContributionHasBeenSubmitted') }}
                <br />
              </v-flex>
            </v-layout>

            <!-- Email -->
            <v-layout wrap v-if="(registerStatus === 'waitingForRegister') || (registerStatus === 'unregistered')">
              <v-flex xs12 sm12 class="title grey-text">
                Your email (optional):
              </v-flex>
              <v-flex xs12 sm12 class="grey--text">
                {{ $t('lang.piggy.contribute.letUsInformYouPerEmailInCaseOfVictory') }}
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
                <v-btn block color="warning" dark @click.native="registerPlayer()">{{ $t('lang.form.label.registerEmail') }}</v-btn>
              </v-flex>
            </v-layout>

            <v-layout v-if="registerStatus === 'registering'" column align-center justify-center style="background-color: white; padding-top: 30px; padding-bottom: 30px" >
              <v-progress-circular :size="60" indeterminate color="warning"></v-progress-circular>
            </v-layout>

            <v-layout wrap v-if="registerStatus === 'registered'">
              <v-flex xs12 sm12 class="grey--text">
                {{ $t('lang.piggy.contribute.YouWillBeInformedPerEmailInCaseOfVictory') }}
              </v-flex>
            </v-layout>
          </v-container>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="contributionStatus !== 'contributed'" color="blue darken-1" flat @click.native="closeDialog()">{{ $t('lang.form.button.cancel') }}</v-btn>
          <v-btn v-if="(contributionStatus === 'contributed') && (registerStatus !== 'registered')" color="blue darken-1" flat @click.native="closeDialog()">{{ $t('lang.form.button.skip') }}</v-btn>
          <v-btn v-if="(contributionStatus === 'contributed') && (registerStatus === 'registered')" color="blue darken-1" flat @click.native="closeDialog()">{{ $t('lang.form.button.ok') }}</v-btn>
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
    buttonLarge: false,
    buttonNormal: false,
    buttonSmall: false,
    infos: false
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
          return !!v || this.$t('lang.form.error.emailIsRequired')
        },
        v => this.validEmail(v) || this.$t('lang.form.error.emailMustBeValid')
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
        'big-contribute-button': this.buttonLarge,
        'normal-contribute-button': this.buttonNormal,
        'small-contribute-button': this.buttonSmall
      }
    },
    contributeTitle: function () {
      if (this.player.contributionBalance > 0) {
        return this.$t('lang.piggy.contribute.title.contributeMore')
      } else {
        return this.$t('lang.piggy.contribute.title.contribute')
      }
    },
    hoverMessage: function () {
      let message = null
      if ((!this.loading.contribution) && (!this.loading.break) && (!this.loading.withdraw)) {
        if (this.transaction.enable) {
          message = this.$t('lang.piggy.contribute.clickTo') + this.contributeTitle + '!'
        } else {
          message = this.metamaskMessage(this.transaction.status) + this.$t('lang.piggy.contribute.first')
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
              // console.log('Valid email registered: ', response)
              self.playerEmail = response
              self.registerStatus = 'registered'
            } else {
              // console.log('Invalid email registered: ', response)
              self.registerStatus = 'unregistered'
            }
          }, function (error) {
            if (error) {
              // console.log('Address not registered')
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
      // console.log('Close contribute dialog')
      this.dialog = false
    },
    // Register player
    registerPlayer () {
      let email = this.playerEmail
      let address = this.player.address
      // console.log('registerPlayer', email, address)

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
          // console.log('registered: ', response)
        }, function (response) {
          // error
          self.registerStatus = 'unregistered'
          self.registerError = response
          // console.log('error: ', response)
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
  width: 40% !important;
  margin-bottom: 50px;
}

.normal-contribute-button {
  width: 200px;
}

.small-contribute-button {
  font-size: 12px !important;
  height: 30px;
  width: 170px !important;
}

.disabled-contribute-button {
  background-color: grey !important;
  height: 220px !important;
}

</style>
