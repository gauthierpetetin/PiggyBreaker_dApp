<template>
  <div>
    <section>
      <!-- <column align-center justify-center > -->
      <v-layout style="background-color: white; padding-top: 30px; padding-bottom: 30px">
        <v-flex xs4 align-center justify-space-around text-xs-center>
          <h1 slot="activator" class="grey--text mb-2 display-3 text-xs-center current" style="margin-top: 100px">Piggy Breaker.<br/>The next world<br/>lottery.</h1>
          <v-btn style="margin-top: 50px !important" class="mt-3 blue" dark large target="_blank" @click.native="startGame()">
            <span>Take your chance now!</span>
          </v-btn>
        </v-flex>
        <v-flex xs8 align-center justify-center layout text-xs-center>
          <v-tooltip bottom>
            <img src="/static/img/welcome/welcome.png" alt="big piggy" height="550" style="margin-top: 15px" slot="activator">
            <span> Groin...groin </span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </section>

    <!-- What is Piggy Breaker -->
    <section>
      <v-parallax  class="parallax-background" height="600">
        <v-layout column align-center justify-center>
          <div style="width: 80%; height: 480px !important; padding: 1% 2%; background-color: white">
          <v-flex class="my-3">
            <div class="text-xs-center">
              <h4 class="display-2 grey--text small-text" style="padding: 10px 0">{{ $t('lang.piggy.piggyIsTheNextWorldLottery.piggyBreakerIsTheNextWorldLottery') }}</h4>
            </div>
          </v-flex>
          <div class="headline mb-3 text-xs-center title">
            <p>
              {{ $t('lang.piggy.piggyIsTheNextWorldLottery.theGameIsCenteredAroundBilly') }}
            </p>
            <img src="/static/img/picto/piggy-growth.png" alt="piggy growth" height="120" style="margin-top: 15px; margin-bottom: 15px">
            <p><br>
              {{ $t('lang.piggy.piggyIsTheNextWorldLottery.somedayThePiggyBankWillBreak') }}
            </p>
          </div>
        </div>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-parallax height="500">
        <v-layout row align-center>
          <v-flex xs6 align-center justify-space-around text-xs-center style="margin-left: 150px;">
            <h1 slot="activator" class="warning-text mb-2 display-2 text-xs-center current">1.Contribute with ether (ETH).</h1>
            <div class="headline mb-3 text-xs-center title">
              <p>
                <br/>
                Anyone can contribute. Just choose the amount of ether (ETH) you want to play. Insert it in the Piggy and that's it: you're in the game to win the lottery. The more you contribute, the more your chances are of winning.
              </p>
            </div>
          </v-flex>
          <v-flex xs6 align-center justify-center layout text-xs-center>
            <img src="/static/img/picto/1-contribute.png" height="250">
          </v-flex>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-parallax height="500">
        <v-layout row align-center style="background-color: white;">
          <v-flex xs6 align-center justify-center layout text-xs-center>
            <img src="/static/img/picto/2-break-piggy.png" height="250">
          </v-flex>
          <v-flex xs6 align-center justify-space-around text-xs-center style="margin-right: 150px">
            <h1 slot="activator" class="pink--text mb-2 display-2 text-xs-center current">2.Some day, the Piggy <br/>bank will break.</h1>
            <div class="headline mb-3 text-xs-center title">
              <p>
                <br/>
                Anyone can decide to break the Piggy, but it is protected by 2 rules:
                the Piggy is protected for 5 minutes after each contribution AND only contributors can break it.
              </p>
            </div>
          </v-flex>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-parallax height="500">
        <v-layout row align-center>
          <v-flex xs6 align-center justify-space-around text-xs-center style="margin-left: 50px; margin-right: 50px">
            <h1 slot="activator" class="blue-text mb-2 display-2 text-xs-center current">3.A winner is chosen <br/>randomly between <br/>all contributors.</h1>
            <div class="headline mb-3 text-xs-center title">
              <p>
                <br/>
                When the Piggy gets broken, a winner is chosen randomly between the contributors. Players' chances to win are proportionnal to their contribution(s).
              </p>
            </div>
          </v-flex>
          <v-flex xs6 align-center justify-center layout text-xs-center>
            <img src="/static/img/picto/3-random-winner.png" height="250">
          </v-flex>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-parallax  class="parallax-background" height="600">
        <v-layout column align-center justify-center>
          <div style="width: 80%; height: 480px !important; padding: 1% 2%; background-color: white">
            <v-flex class="my-3">
              <div class="text-xs-center">
                <h4 class="display-1 grey--text">{{ $t('lang.homepage.theSimplestBlockchainGameEver') }}</h4>
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
            <v-flex align-center justify-space-around text-xs-center>
              <v-btn style="height: 50px; width: 400px" class="headline mt-3 blue" dark large target="_blank" @click.native="startGame()">
                <span>Take your chance now!</span>
              </v-btn>
            </v-flex>
          </div>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-parallax height="40">
      </v-parallax>
    </section>

  </div>
</template>

<script>

import router from '@/router'

export default {
  data () {
    return {
    }
  },
  methods: {
    startGame () {
      console.log('Start game')
      router.push('/home')
    }
  }
}

</script>

<style>
.parallax-background {
  background-image: url('/static/img/background/background-piggies50.png');
  background-repeat: repeat;
  background-size: 426px 201px;
}

.grey-text {
  color: #404040 !important
}

.blue-text {
  color: #2196F3
}

.warning-text {
  color: #FDC825
}

p {
  color: grey;
  line-height: 2 !important;
}
</style>
