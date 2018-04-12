<template>
  <div>
    <app-contribute></app-contribute>
    <section>
      <v-parallax  class="parallax-background" height="280">
        <v-layout column align-center justify-center>
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="display-2 black--text">But what is it?</h2>
            </div>
          </v-flex>
          <div class="headline black--text mb-3 text-xs-center">Piggy Breaker is a game built on blockchain technology.<br/>You can securely play with Ether to get a chance to break the piggy!</div>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-5">
          <v-flex sm12 class="my-3">
            <div class="text-xs-center">
              <h2 class=" display-1">Examples</h2>
            </div>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card class="elevation-0 transparent">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs4>
                    <v-card-media
                      src="/static/img/picto/piggy.png"
                      height="125px"
                      contain
                    ></v-card-media>
                  </v-flex>
                  <v-flex xs8>
                    <v-list class="transparent">
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Piggy value: 40 ETH</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Your contribution: 20 ETH</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Your chances to win the lottery: 50%</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card class="elevation-0 transparent">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs4>
                    <v-card-media
                      src="/static/img/picto/piggy.png"
                      height="125px"
                      contain
                    ></v-card-media>
                  </v-flex>
                  <v-flex xs8>
                    <v-list class="transparent">
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Piggy value: 40 ETH</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Your contribution: 0.4 ETH</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Your chances to win the lottery: 1%</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </div>
</template>

<script>

import Contribute from '@/views/contribute/Contribute'

export default {
  components: {
    appContribute: Contribute
  }
}
</script>

<style>
.parallax-background {
  background-image: url("/static/img/background/background-piggies.jpg");
  background-repeat: repeat;
  background-size: 426px 201px;
}

.remaining-time {
  color: #a2a2a2;
  font-weight: bold;
  font-size: 16px;
  margin-left: 15px;
}
</style>
