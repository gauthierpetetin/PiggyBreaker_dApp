<template>
  <div>
    <v-btn
      class="mt-3"
      :class="classButton"
      style="background-color: #FFD700;"
      dark
      large
      slot="activator"
      @click.native="contributeDialog()"
    >
      Contribute
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
                <span class="title grey-text">Your ETH contribution*:</span><br />
                <span class="caption" style="color: grey">Minimum contribution: {{ dialogGame.minContribution }} ETH</span>
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
                <v-btn block color="warning" dark @click.native="contributePiggy()">Contribute</v-btn>
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
          <!-- <v-container grid-list-md v-if="contributionStatus === 'registered'">
            <v-layout wrap>
              <v-flex xs12 sm6>
                All right, you will be notified
              </v-flex>
            </v-layout>
          </v-container> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="contributionStatus === 'contributing'" color="blue darken-1" flat @click.native="dialog = false">Cancel</v-btn>
          <v-btn v-if="contributionStatus === 'contributed' && registerStatus === 'unregistered'" color="blue darken-1" flat @click.native="dialog = false">Skip</v-btn>
          <v-btn v-if="contributionStatus === 'contributed' && registerStatus === 'registered'" color="blue darken-1" flat @click.native="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import firestoreMixin from '@/mixins/firestore'
import ethereumMixin from '@/mixins/ethereum'


export default {
  mixins: [
    firestoreMixin,
    ethereumMixin
  ],
  props: {
    buttonLarge: true,
    dialogGame: null,
    playerAddress: null
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
    classButton: function () {
      return {
        'contribute-button': this.buttonLarge
      }
    }
  },
  methods: {
    // Show dialog
    contributeDialog () {
      this.dialog = true //command to show dialog
      // this.contributionStatus = 'contributing'
      // this.contributionStatus = 'contributed'
      // this.registerStatus = 'unregistered'
      // this.registerStatus = 'registered'

      // Get player email
      let self = this
      this.getPlayerEmail(this.playerAddress).then(function (response) {
        console.log('Address registered: ', response)
        self.playerEmail = response
        self.registerStatus = 'registered'
      }, function (error) {
        if (error) {
          console.log('Address not registered')
          self.registerStatus = 'unregistered'
        }
      })
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

.contribute-button {
  font-size: 42px;
}

</style>
