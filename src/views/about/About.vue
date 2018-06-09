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
                <h1 class="display-1 grey-text">About</h1>
              </v-flex>

              <v-flex md10 offset-md1>
                <h2 class="grey-text headline">Game</h2>
              </v-flex>
              <v-flex md10 offset-md1>
                <p>
                  Piggy Breaker is the simplest blockchain game ever seen:
                </p>
                <ol>
                  <li>You contribute ether (ETH) to fill the piggy bank and get a chance to win the lottery.</li><br />
                  <li>The lottery is launched when the piggy gets broken.</li><br />
                  <li>The winner is chosen “randomly” between all contributors.</li><br />
                </ol>
                <p>
                  Furthermore, Piggy Breaker is different from traditional lotteries : YOU are the one who decides your chances of winning.
                  The more you contribute, the higher your chances are of winning.
                  Indeed, an algorithm makes the player's chances of winning proportionnal to his individual contributions.
                </p>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex md10 offset-md1>
                <h2 class="grey-text headline">Team</h2>
              </v-flex>
              <v-flex md10 offset-md1>
                <p>
                  We are a team passionate about blockchain technology. We are here to answer your questions and improve your experience every day. You can contact us on <a href="mailto:contact@piggybreaker.com">contact@piggybreaker.com</a>.
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
                <h2 class="grey-text headline">Security</h2>
              </v-flex>
              <v-flex md10 offset-md1>
                <p>
                  Piggy Breaker is built on blockchain technology. Blockchain is the technology that makes things like Bitcoin possible. It offers total security "by design", which ensures the piggy content and your contribution(s) cannot be replicated, taken away, or destroyed.
                </p>
                <p>
                  Thus you can securely play with Ether and get a chance to win the lottery!
                </p>
                <v-layout row wrap justify-center>
                  <img center src="/static/img/picto/piggy-chained.png" alt="big piggy" height="100">
                </v-layout>
                <br /><br />
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
