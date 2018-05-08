<template>
  <div>
    <!-- Contribute -->
    <app-contribute></app-contribute>
    <!-- /Contribute -->
    <section>
      <v-parallax  class="parallax-background" height="480">
        <v-layout column align-center justify-center>
          <div style="width: 80%; height: 380px; padding: 1% 5%; background-color: white">
            <v-flex class="my-3">
              <div class="text-xs-center">
                <h4 class="display-1 grey-text blue-text">But what makes Piggy Breaker so special?</h4>
              </div>
            </v-flex>
            <div class="headline mb-3 text-xs-center title">
              <p>
                Piggy Breaker is the most simple game built on blockchain technology.
              </p>
              <p>
                Blockchain is the technology that makes things like Bitcoin possible. It offers total security "by design", which ensures the piggy content and your contribution(s) cannot be replicated, taken away, or destroyed.
              </p>
              <img src="/static/img/picto/piggy-chained.png" alt="big piggy" height="100">
              <p><br>
                Thus you can securely play with Ether and get a chance to win the lottery!
              </p>
            </div>
          </div>
        </v-layout>
      </v-parallax>
    </section>
    <!-- Example -->
    <section style="background-color: white">
      <v-container grid-list-xl style="padding: 0 0; padding-bottom: 60px">
        <v-layout row wrap justify-center class="my-5" style="margin: 10px 0 !important;">
          <v-flex sm12 class="my-3">
            <div class="text-xs-center">
              <h4 class="display-1 grey-text">Examples</h4>
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
                          <v-list-tile-title class="grey-text">Piggy value: 40 ETH</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title class="grey-text">Your contribution: 20 ETH</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title class="grey-text">Your chances to win the lottery: 50%</v-list-tile-title>
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
                          <v-list-tile-title class="grey-text">Piggy value: 100 ETH</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title class="grey-text">Your contribution: 25 ETH</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title class="grey-text">Your chances to win the lottery: 25%</v-list-tile-title>
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
  background-image: url('/static/img/background/background-piggies3.png');
  background-repeat: repeat;
  background-size: 426px 201px;
}

.remaining-time {
  color: #a2a2a2;
  font-weight: bold;
  font-size: 16px;
  margin-left: 15px;
}

.grey-text {
  color: #404040 !important
}

.blue-text {
  color: #2196F3
}

p {
  color: grey
}
</style>
