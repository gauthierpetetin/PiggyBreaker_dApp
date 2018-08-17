<template>
  <div>
    <!-- Contribute -->
    <app-contribute></app-contribute>
    <!-- /Contribute -->
    <section>
      <v-parallax  class="parallax-background" height="550">
        <v-layout column align-center justify-center class="full-opacity">
          <div style="width: 80%; height: 400px; padding: 2% 5%; background-color: white">
            <v-flex class="my-3">
              <div class="text-xs-center">
                <h4 class="display-1 blue-text">{{ $t('lang.homepage.theSimplestBlockchainGameEver') }}</h4>
              </div>
            </v-flex>
            <div class="headline mb-3 text-xs-center title">
              <p>
                {{ $t('lang.homepage.blockchainIsTheTechnologyThatMakesThingsPossible') }}
              </p>
              <br />
              <img src="/static/img/picto/piggy-chained.png" alt="big piggy" height="100"><br /><br />
              <p>
                {{ $t('lang.homepage.thusYouCanSecurelyPlayWithEther') }}
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
              <h4 class="display-1 grey-text">{{ $t('lang.homepage.increaseYourChancesOfWinningByContributing') }}</h4><br />
            </div>
            <div class="headline mb-3 text-xs-center title">
              <p>
                {{ $t('lang.homepage.yourChancesOfWinningTheLotteryAreProportional') }}
              </p>
            </div>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card class="elevation-0 transparent">
              <v-container fluid grid-list-lg>
                <v-layout row>

                  <v-flex xs12 class="text-md-center">
                    <img src="/static/img/picto/piggy.png" width="100">
                    <h1 class="pink--text">{{ $t('lang.homepage.example.totalPiggy40') }}</h1>
                    <br />
                    <h1 class="mb-2 subheading text-xs-center contribution">
                      <span class="grey--text">{{ $t('lang.homepage.example.yourContribution') }}</span>
                      <span class="grey--text">20 ETH</span>
                      <v-progress-linear :value="50" height="20" color="grey"></v-progress-linear>
                      <br />
                      <span class="title blue--text" v-html="$t('lang.homepage.example.inThisExampleYourChancesAre50')"></span>
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
                    <h1 class="pink--text">{{ $t('lang.homepage.example.totalPiggy100') }}</h1>
                    <br />
                    <h1 class="mb-2 subheading text-xs-center contribution">
                      <span class="grey--text">{{ $t('lang.homepage.example.yourContribution') }}</span>
                      <span class="grey--text">25 ETH</span>
                      <v-progress-linear :value="25" height="20" color="grey"></v-progress-linear>
                      <br />
                      <span class="title blue--text" v-html="$t('lang.homepage.example.inThisExampleYourChancesAre25')"></span>
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
