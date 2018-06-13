<template>
  <div>
    <section>
      <v-layout align-center style="background-color: white; padding-top: 70px; padding-bottom: 70px">
        <v-flex md4 class="text-xs-center">
          <img src="/static/img/picto/piggy-eye.png" width="160">
        </v-flex>
        <v-flex md8 class="blue--text" style="margin-top: 20px">
          <!-- Display -->
          <span v-if="this.playerSettings.login === null || this.playerSettings.login === ''" v-show="!editField.login" class="headline pink--text"><i>Enter nickname</i></span>
          <span v-show="!editField.login" class="display-1" style="float: left;">{{ this.playerSettings.login }}</span>
          <v-btn v-show="!editField.login" small flat fab style="bottom: 5px;" @click="editField.login = true">
            <v-icon>edit</v-icon>
          </v-btn>
          <!-- Submit -->
          <v-flex class="my-3">
            <div style="float:left">
              <v-text-field v-model="playerSettings.login" v-show="editField.login" type="text" :rules="loginRules" class="field-value form-control" single-line></v-text-field>
            </div>
            <div>
              <v-btn v-show="editField.login"  flat fab @click="submitLogin()">
                <v-icon color="green">check</v-icon>
              </v-btn>
              <v-btn v-show="editField.login"  flat fab @click="cancelLogin()">
                <v-icon color="red">clear</v-icon>
              </v-btn>
            </div>
          </v-flex>
          <p>
            <!-- Display -->
            <span v-if="this.playerSettings.email === null || this.playerSettings.email === ''" v-show="!editField.email" class="title pink--text"><i>Enter email</i></span>
            <span v-show="!editField.email" class="headline">{{ this.playerSettings.email }}</span>
            <v-btn v-show="!editField.email" small flat fab style="bottom: 3px;" @click="editField.email = true">
              <v-icon>edit</v-icon>
            </v-btn>
            <!-- Submit -->
            <v-flex class="my-3">
              <div style="float:left">
                <v-text-field v-model="playerSettings.email" v-show="editField.email"
                type="email"
                :rules="emailRules" class="field-value form-control"></v-text-field>
              </div>
              <div>
                <v-btn v-show="editField.email" flat fab @click="submitEmail()">
                  <v-icon color="green">check</v-icon>
                </v-btn>
                <v-btn v-show="editField.email" flat fab @click="cancelEmail()">
                  <v-icon color="red">clear</v-icon>
                </v-btn>
              </div>
            </v-flex>
          </p>
          <p class="grey--text">
            {{ player.address }}
          </p>
        </v-flex>
      </v-layout>
    </section>

    <section>
      <v-parallax class="parallax-background" height="550">
        <v-layout column align-center justify-center style="padding-bottom: 25px;">

          <div style="width: 80%; height: 400px; padding: 2% 2%; background-color: white;">
            <v-flex class="my-3">
              <div class="text-xs-center">
                <h4 class="display-1 small-text blue--text">Email info</h4>
              </div>
            </v-flex>
            <v-flex class="my-3">
              <div class="text-xs-center grey--text title">
                <p>
                  You can be informed about important Piggy Breaker events<br /> by subscribing to the following features:
                </p>
              </div>
            </v-flex>

            <v-flex md10 style="padding: 2% 0">
              <v-container grid-list-xl>
                <v-layout row wrap>
                  <v-flex md10 offset-md1>
                    <v-form v-model="valid" ref="form" lazy-validation>
                      <v-checkbox
                      color="info"
                      label="I want to be informed if I win."
                      v-model="playerSettings.notify_victory"
                      ></v-checkbox>
                      <v-checkbox
                      color="info"
                      label="I want to be informed when the game I played is over."
                      v-model="playerSettings.notify_stop"
                      ></v-checkbox>
                      <v-checkbox
                      color="info"
                      label="I want to be informed when a new game starts."
                      v-model="playerSettings.notify_start"
                      ></v-checkbox>
                    </v-form>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>

          </div>
        </v-layout>
      </v-parallax>
    </section>

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
  data () {
    return {
      apiUrl: process.env.API_URL,
      valid: true,
      // player: {
      //   email: ''
      // },
      editField: {
        login: false,
        email: false
      },
      previousLogin: null,
      previousEmail: null,
      loginRules: [
        // v => {
        //   return !!v || 'Login is required'
        // },
        v => /^$|^\w+$/.test(v) || 'Login must be empty or valid'
      ],
      emailRules: [
        // v => {
        //   return !!v || 'E-mail is required'
        // },
        v => /^$|^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be empty or valid'
      ]
    }
  },
  mounted () {
    this.initSettings()
  },
  watch: {
    'playerSettings.notify_start': function (val) {
      this.updateSettings()
    },
    'playerSettings.notify_stop': function (val) {
      this.updateSettings()
    },
    'playerSettings.notify_victory': function (val) {
      this.updateSettings()
    },
    'player.address': function (val) {
      this.initSettings()
    }
  },
  methods: {
    validateEmail (email) {
      var re = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i
      return re.test(String(email).toLowerCase())
    },
    // Submit login
    submitLogin () {
      this.editField.login = false
      this.updateSettings()
    },
    // Submit email
    submitEmail () {
      if (this.playerSettings.email === '' || this.validateEmail(this.playerSettings.email)) {
        this.editField.email = false
        this.updateSettings()
      }
    },
    // Cancel login
    cancelLogin () {
      // console.log(this.playerSettings.email)
      // console.log(this.previousEmail)
      this.playerSettings.login = this.previousLogin
      this.editField.login = false
    },
    // Cancel email
    cancelEmail () {
      // console.log(this.playerSettings.email)
      // console.log(this.previousEmail)
      this.playerSettings.email = this.previousEmail
      this.editField.email = false
    },
    // Init settings
    initSettings () {
      let self = this
      this.playerSettings = {
        address: null,
        email: null,
        login: null,
        notify_start: null,
        notify_stop: null,
        notify_victory: null,
        withdraw_alert: null
      }
      this.getPlayerAddress().then(function (response) {
        let address = response
        self.getPlayerInfo(address).then(function (response) {
          self.playerSettings = response
          self.previousLogin = response.login
          self.previousEmail = response.email
        })
      })
    },
    // Update settings
    updateSettings () {
      // Call API
      let data = {
        address: this.playerSettings.address,
        email: this.playerSettings.email,
        login: this.playerSettings.login,
        notify_start: this.playerSettings.notify_start,
        notify_stop: this.playerSettings.notify_stop,
        notify_victory: this.playerSettings.notify_victory
      }
      this.$http.post(this.apiUrl + '/user/settings', JSON.stringify(data))
        .then(function (response) {
          this.editField.email = false
        }, function (response) {
          // error
          console.log('error', response)
        })
    }
  }
}

</script>

<style scoped>

.parallax-background {
  background-image: url("/static/img/background/background-piggies50.png");
  background-repeat: repeat;
  background-size: 426px 201px;
}

.player-infos {
  margin: 50px 0 50px 0;
}

.field-value {
  /* background-color: #ffffff; */
  //border-radius: 25px;
  //padding: 5px 10px;
  //border: 1px solid #000000;
  width: 300px;
}
</style>
