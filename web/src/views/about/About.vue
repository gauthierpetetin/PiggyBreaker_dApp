<template>
  <div>


    <section>
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <v-flex md12 >
          <img src="/static/img/picto/piggy.png" alt="avatar" width="100">
        </v-flex>
        <v-flex md12>
          <v-container grid-list-xl>
            <v-layout row wrap>
              <v-flex md12>
                <h1 class="headline">About</h1>
              </v-flex>
              <v-flex md12>
                <p>
                  CryptoPiggies is the simplest blockchain game ever seen:
                </p>
                <ul>
                  <li>1) You contribute with ether (ETH) to fill the piggy bank and get a chance to win the lottery</li>
                  <li>2) The lottery is launched when the piggy gets broken</li>
                  <li>3) The winner is chosen “randomly” between all contributors</li>
                </ul>
                <p>
                  Furthermore, CryptoPiggies introduces a new concept in regard of traditional lotteries : YOU are the one who decides your chances to win.<br />
                  The more you contribute, the more chances you have to win.<br />
                  Indeed, an algorithm sets chances to win proportional to player’s individual contributions.
                </p>
                <p>
                  CryptoPiggies is a blockchain game. ‘Blockchain’ is the technology that makes things like Bitcoin possible. It offers total security “by design”, which ensures the piggy content cannot be replicated, taken away, or destroyed.
                </p>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <template v-for="(member, index) in team">
                <v-flex v-if="index === 0" md2  offset-xs1>
                  <app-member :member="member"></app-member>
                </v-flex>
                <v-flex v-else md2 >
                  <app-member :member="member"></app-member>
                </v-flex>
            </template>
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
        { name: 'Gauthier Petetin', role: 'Product and Development' },
        { name: 'Raphaël Pralat', role: 'Product and Development' },
        { name: 'Pablo Valles', role: 'Marketing' },
        { name: 'Sylvain Laurent', role: 'Development' },
        { name: 'Matthis Pralat', role: 'Design' }
      ]
    }
  },
  components: {
    appMember: Member
  }
}

</script>
