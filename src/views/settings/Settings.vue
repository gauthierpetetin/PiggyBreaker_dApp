<template>
  <div>
    <section>
      <v-parallax class="parallax-background">
        <v-container grid-list-xl class="player-infos">
          <v-layout align-center>
            <v-flex md4 class="text-xs-center">
              <img src="/static/img/picto/piggy-eye.png" width="160">
            </v-flex>
            <v-flex md8 class="black--text">
              <!-- Display -->
              <h2 v-show="!editField.login" style="float: left;">{{ this.playerSettings.login }}</h2>
              <v-btn v-show="!editField.login" small flat fab style="bottom: 10px;" @click="editField.login = true">
                <v-icon>edit</v-icon>
              </v-btn>
              <!-- Submit -->
              <v-text-field v-model="playerSettings.login" v-show="editField.login" type="text" :rules="loginRules" class="field-value form-control" single-line></v-text-field>
              <v-btn v-show="editField.login" small flat fab  @click="submitLogin()">
                <v-icon>check_circle</v-icon>
              </v-btn>
              <v-btn v-show="editField.login" small flat fab  @click="editField.login = false">
                <v-icon>cancel</v-icon>
              </v-btn>
              <p>
                {{ this.playerSettings.address }}
              </p>
              <p>
                <!-- Display -->
                <span v-show="!editField.email">{{ this.playerSettings.email }}</span>
                <v-btn v-show="!editField.email" small flat fab @click="editField.email = true">
                  <v-icon>edit</v-icon>
                </v-btn>
                <!-- Submit -->
                <v-text-field v-model="playerSettings.email" v-show="editField.email" type="email" :rules="emailRules" class="field-value form-control"></v-text-field>

                <v-btn v-show="editField.email" small flat fab @click="submitEmail()">
                  <v-icon>check_circle</v-icon>
                </v-btn>
                <v-btn v-show="editField.email" small flat fab @click="editField.email = false">
                  <v-icon>cancel</v-icon>
                </v-btn>
              </p>
            </v-flex>
          </v-layout>
        </v-container>
      </v-parallax>
    </section>

    <section>
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <v-flex md10 style="width: 100%">
          <v-container grid-list-xl>
            <v-layout row wrap>
              <v-flex md10 offset-md1>
                <h1 class="headline">Settings</h1>
              </v-flex>
              <v-flex md10 offset-md1>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-checkbox
                    label="I want to be informed in case of victory."
                    v-model="playerSettings.victory" @click="submitNotifications()"
                  ></v-checkbox>
                  <v-checkbox
                    label="I want to be informed when the game I played is over."
                    v-model="playerSettings.game_over" @click="submitNotifications()"
                  ></v-checkbox>
                  <v-checkbox
                    label="I want to be informed when a new game starts."
                    v-model="playerSettings.new_game" @click="submitNotifications()"
                  ></v-checkbox>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
  </div>
</template>

<script>

import firestoreMixin from '@/mixins/firestore'

export default {
  mixins: [
    firestoreMixin
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
    let self = this
    // Get player info
    this.getPlayerInfo('0xb5747835141b46f7C472393B31F8F5A57F74A44f').then(function (response) {
      console.log('coucou', response)
      self.playerSettings = response
    })
  },
  methods: {
    // Change login
    submitLogin () {
      // Call webservice
      let data = {login: this.playerSettings.login}
      console.log('Data', data)
      this.$http.post(this.apiUrl + '/user/settings', JSON.stringify(data))
        .then(function (response) {
          this.editField.login = false
        }, function (response) {
          // error
          this.editField.login = false
          console.log('error', response.body.status)
        })
    },
    // Change Email
    submitEmail () {
      if (!this.playerSettings.email) {
        return false
      }
      // Call webservice
      let data = {login: this.playerSettings.email}
      console.log('Data', data)
      this.$http.post(this.apiUrl + '/user/settings', JSON.stringify(data))
        .then(function (response) {
          this.editField.email = false
        }, function (response) {
          // error
          this.editField.email = false
          console.log('error', response.body.status)
        })
    },
    // Submit notifications
    submitNotifications () {
      // Call API
      let data = {
        victory: this.playerSettings.victory,
        game_over: this.playerSettings.game_over,
        new_game: this.playerSettings.new_game
      }
      this.$http.post(this.apiUrl + '/user/settings', JSON.stringify(data))
        .then(function (response) {
          this.editField.email = false
        }, function (response) {
          // error
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
  background-image: url("/static/img/background/background-piggies.jpg");
  background-repeat: repeat;
  background-size: 426px 201px;
  height: auto !important;
  color: #000;
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
