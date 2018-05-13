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
                  <li>You contribute with ether (ETH) to fill the piggy bank and get a chance to win the lottery.</li><br />
                  <li>The lottery is launched when the piggy gets broken.</li><br />
                  <li>The winner is chosen “randomly” between all contributors.</li><br />
                </ol>
                <p>
                  Furthermore, Piggy Breaker introduces a new concept in regard of traditional lotteries : YOU are the one who decides your chances to win.
                  The more you contribute, the more chances you have to win.
                  Indeed, an algorithm sets chances to win proportional to player’s individual contributions.
                </p>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
            <v-flex md10 offset-md1>
              <h2 class="grey-text headline">Team</h2>
            </v-flex>
            <v-flex md10 offset-md1>
              <p>
                We are a team passionated about blockchain technology. We are there to answer your questions and improve your experience every day. You can contact us on <a href="mailto:contact@piggybreaker.com">contact@piggybreaker.com</a>.
              </p>
            </v-flex>
              <template v-for="(member, index) in team">
                <v-flex v-if="index === 0" md2  offset-xs1 :key="index">
                  <app-member :member="member"></app-member>
                </v-flex>
                <v-flex v-else md2 :key="index">
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
                <img center src="/static/img/picto/piggy-chained.png" alt="big piggy" height="100">
                <br /><br />
                <p>
                  PS: the game code is public and can accessed <a href="https://etherscan.io/address/0x06012c8cf97bead5deae237070f9587f8e7a266d#code">here</a>.
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
