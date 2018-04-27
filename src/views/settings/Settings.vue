<template>
  <div>
    <section>
      <v-parallax class="parallax-background">
        <v-container grid-list-xl class="player-infos">
          <v-layout align-center>
            <v-flex md4 class="text-xs-center">
              <img src="/static/img/picto/broken-piggy.png" width="100">
            </v-flex>
            <v-flex md8 class="black--text">
              <h2 style="float: left;">{{ this.playerSettings.login }}</h2>
              <v-btn small flat fab style="bottom: 10px;">
                <v-icon>edit</v-icon>
              </v-btn>
              <p>
                {{ this.playerSettings.address }}
              </p>
              <p>
                {{ this.playerSettings.email }}
                <v-btn small flat fab>
                  <v-icon>edit</v-icon>
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
                <v-form v-model="valid" ref="form" lazy-validation :change="submit()">
                  <v-checkbox
                    label="I want to be informed in case of victory."
                    v-model="this.playerSettings.victory"
                  ></v-checkbox>
                  <v-checkbox
                    label="I want to be informed when the game I played is over."
                    v-model="this.playerSettings.game_over"
                  ></v-checkbox>
                  <v-checkbox
                    label="I want to be informed when a new game starts."
                    v-model="this.playerSettings.new_game"
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
      valid: true
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
    // Submit form
    submit () {
      // ok
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

</style>
