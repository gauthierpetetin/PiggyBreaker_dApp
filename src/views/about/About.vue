<template>
  <div>
    <section>
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <!-- <v-flex md12 >
          <img src="/static/img/picto/piggy.png" alt="avatar" width="100">
        </v-flex> -->
        <v-flex md12>
          <v-container grid-list-xl class="player-infos">
            <v-layout row wrap>
              <v-flex md10 offset-md1>
                <h1 class="display-1 grey-text">{{ $t('lang.about.about') }}</h1>
              </v-flex>

              <v-flex md10 offset-md1>
                <h2 class="grey-text headline">{{ $t('lang.about.game') }}</h2>
              </v-flex>
              <v-flex md10 offset-md1>
                <p>
                  {{ $t('lang.about.PiggyBreakerIsTheSimplestGame') }}
                </p>
                <ol>
                  <li>{{ $t('lang.about.youContributeToFillThePiggy') }}</li><br />
                  <li>{{ $t('lang.about.theLotteryIsLaunchedWhenBroken') }}</li><br />
                  <li>{{ $t('lang.about.thisWinnerIsChosenRandomly') }}</li><br />
                </ol>
                <p v-html="$t('lang.about.furthermorePiggyBreakerIsDifferentFromTraditionalLotteries')">
                </p>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex md10 offset-md1>
                <h2 class="grey-text headline">{{ $t('lang.about.team') }}</h2>
              </v-flex>
              <v-flex md10 offset-md1>
                <p>
                  {{ $t('lang.about.weAreATeamPassionateAboutBlockchain') }} <a href="mailto:contact@piggybreaker.com">contact@piggybreaker.com</a>.
                </p>
              </v-flex>
            </v-layout>

            <v-layout row wrap justify-center>
              <template v-for="(member, index) in team">
                <v-flex xs4 sm3 md2 :key="index">
                  <app-member :member="member"></app-member>
                </v-flex>
              </template>
            </v-layout>

            <v-layout row wrap style="margin-top: 35px">
              <v-flex md10 offset-md1>
                <h2 class="grey-text headline">{{ $t('lang.about.security') }}</h2>
              </v-flex>
              <v-flex md10 offset-md1>
                <p>
                  {{ $t('lang.about.piggyBreakerIsBuildOnBlockchain') }}
                </p>
                <p>
                  {{ $t('lang.about.psGameCodeIsPublic') }}
                </p>
                <v-layout row wrap justify-center>
                  <img center src="/static/img/picto/piggy-chained.png" alt="big piggy" height="100">
                </v-layout>
                <br /><br />
                <p v-html="$t('lang.about.psGameCodeIsPublic')">
                </p>
                <p>
                  PS: the game code is public and can accessed <a target="_blank" :href="explorerAddress">here</a>.
                </p>
              </v-flex>
            </v-layout>

          </v-container>
        </v-flex>
      </v-layout>
    </section>
  </div>
</template>

<script>

import Member from '@/views/about/Member'

export default {
  data () {
    return {
      team: [
        { name: 'Piggy G', role: 'Product and Development', img: '/static/img/team/piggy_g.png' },
        { name: 'Piggy R', role: 'Product and Development', img: '/static/img/team/piggy_r.png' },
        { name: 'Piggy P', role: 'Marketing', img: '/static/img/team/piggy_p.png' },
        { name: 'Piggy S', role: 'Development', img: '/static/img/team/piggy_s.png' },
        { name: 'Piggy M', role: 'Design', img: '/static/img/team/piggy_m.png' }
      ]
    }
  },
  components: {
    appMember: Member
  },
  computed: {
    explorerAddress () {
      let expAddress = ''
      if (this.$store.state.contract.address) {
        if (process.env.ETHEREUM_NODE_ENV === 'development') {
          expAddress = this.$store.state.explorer.contract.ropsten + this.$store.state.contract.address
        } else {
          expAddress = this.$store.state.explorer.contract.mainnet + this.$store.state.contract.address
        }
      }
      return expAddress
    }
  }
}

</script>

<style scoped>
  li {
    color: grey;
    margin-left: 30px;
  }

  p {
    color: grey
  }

</style>
