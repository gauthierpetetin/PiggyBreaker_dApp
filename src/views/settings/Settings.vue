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
          <v-btn v-show="!editField.login" small flat fab style="bottom: 10px;" @click="editField.login = true">
            <v-icon>edit</v-icon>
          </v-btn>
          <!-- Submit -->
          <v-text-field v-model="playerSettings.login" v-show="editField.login" type="text" :rules="loginRules" class="field-value form-control" single-line></v-text-field>
          <v-btn v-show="editField.login" small flat fab @click="submitLogin()">
            <v-icon color="green">check_circle</v-icon>
          </v-btn>
          <v-btn v-show="editField.login" small flat fab  @click="editField.login = false">
            <v-icon color="red">cancel</v-icon>
          </v-btn>
          <p>
            <!-- Display -->
            <span v-if="this.playerSettings.email === null || this.playerSettings.email === ''" v-show="!editField.email" class="title pink--text"><i>Enter email</i></span>
            <span v-show="!editField.email" class="headline">{{ this.playerSettings.email }}</span>
            <v-btn v-show="!editField.email" small flat fab @click="editField.email = true">
              <v-icon>edit</v-icon>
            </v-btn>
            <!-- Submit -->
            <v-text-field v-model="playerSettings.email" v-show="editField.email"
            type="email"
            :rules="emailRules" class="field-value form-control"></v-text-field>
            <v-btn v-show="editField.email" small flat fab @click="submitEmail()">
              <v-icon color="green">check_circle</v-icon>
            </v-btn>
            <v-btn v-show="editField.email" small flat fab @click="editField.email = false">
              <v-icon color="red">cancel</v-icon>
            </v-btn>
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
                <h4 class="display-1 small-text blue--text">Email infos</h4>
              </div>
            </v-flex>
            <v-flex class="my-3">
              <div class="text-xs-center grey--text title">
                <p>
                  You can be informed about important Piggy Breaker events<br /> by subscribing the following features:
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
                      label="I want to be informed in case of victory."
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
      loginRules: [
        v => {
          return !!v || 'Login is required'
        },
        v => /^\w+$/.test(v) || 'Login must be valid'
      ],
      emailRules: [
        v => {
          return !!v || 'E-mail is required'
        },
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
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
    // Submit login
    submitLogin () {
      this.editField.login = false
      this.updateSettings()
    },
    // Submit email
    submitEmail () {
      this.editField.email = false
      this.updateSettings()
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
      console.log(data)

      this.$http.post(this.apiUrl + '/user/settings', JSON.stringify(data))
        .then(function (response) {
          this.editField.email = false
        }, function (response) {
          // error
          console.log('error', response)
          console.log('error', response.body.status)
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
