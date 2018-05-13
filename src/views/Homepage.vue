<template>
  <div>
    <!-- Contribute -->
    <app-contribute></app-contribute>
    <!-- /Contribute -->
    <section>
      <v-parallax  class="parallax-background" height="550">
        <v-layout column align-center justify-center class="full-opacity">
          <div style="width: 80%; height: 400px; padding: 1% 5%; background-color: white">
            <v-flex class="my-3">
              <div class="text-xs-center">
                <h4 class="display-1 blue-text">But what makes Piggy Breaker so special?</h4>
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
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-5" style="margin-top: 0px !important;">
          <v-flex sm12 class="my-3" style="margin-bottom: 0 !important">
            <div class="text-xs-center">
              <h4 class="display-1 grey-text">Examples</h4>
            </div>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card class="elevation-0 transparent">
              <v-container fluid grid-list-lg>
                <v-layout row>

                  <v-flex xs12 class="text-md-center">
                    <img src="/static/img/picto/piggy.png" width="100">
                    <h1 class="pink--text">Piggy value: 40 ETH</h1>
                    <br />
                    <h1 class="mb-2 subheading text-xs-center contribution">
                      <span class="grey--text">Your contribution:</span>
                      <span class="grey--text">20 ETH</span>
                      <v-progress-linear :value="50" height="20" color="grey"></v-progress-linear>
                      <br />
                      <span class="title blue--text">Your chances to win the lottery: 50%</span>
                    </h1>
                  </v-flex>

                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card class="elevation-0 transparent">
              <v-container fluid grid-list-lg>
                <v-layout row>

                  <v-flex xs12 class="text-md-center">
                    <img src="/static/img/picto/piggy.png" width="100">
                    <h1 class="pink--text">Piggy value: 100 ETH</h1>
                    <br />
                    <h1 class="mb-2 subheading text-xs-center contribution">
                      <span class="grey--text">Your contribution:</span>
                      <span class="grey--text">25 ETH</span>
                      <v-progress-linear :value="25" height="20" color="grey"></v-progress-linear>
                      <br />
                      <span class="title blue--text">Your chances to win the lottery: 25%</span>
                    </h1>
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
  background-image: url('/static/img/background/background-piggies50.png');
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
