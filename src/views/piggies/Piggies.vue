<template>
  <div>
    <section>
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <v-container grid-list-md >
          <v-layout row wrap>
            <v-flex md12>
              <h1 class="headline grey-text">Current Piggy</h1>
              <app-piggy-detail :detailGame="currentGame"></app-piggy-detail>
            </v-flex>

            <v-flex md12>
              <h1 class="headline grey-text">Previous Piggy</h1>
              <app-piggy-detail :detailGame="previousGame"></app-piggy-detail>
            </v-flex>

            <v-flex md12>
              <h1 class="headline grey-text">Past Piggies</h1>
            </v-flex>

            <v-flex v-for="(game, index) in games" :key="index" md12 style="margin-bottom: 10px;">
              <app-piggy-detail :detailGame="game"></app-piggy-detail>
              <!-- <v-card>
                <v-layout>
                  <v-flex sm3>
                    <v-card-text>
                      <div class="text-md-center">
                        <img v-if="game.open === false" src="/static/img/picto/broken-piggy.png" width="100">
                        <img v-if="game.open === true" src="/static/img/picto/piggy.png" width="100">
                        <h3 class="pink--text">{{ game.value }} ETH</h3>
                      </div>
                    </v-card-text>
                  </v-flex>
                  <v-flex sm9>
                    <v-card-title>
                      <div style="width: 90%">
                        <h1 class="grey--text">#{{ game.id }}</h1>
                        <h3 v-if="game.open === false">Winner: {{ game.winner }}</h3>
                        <br />
                        <span><strong>{{ game.nbContributions }}</strong> contributions</span><br />
                        <span class="grey--text">Created at: {{ game.createdAt }}</span><br />
                        <span v-if="game.open" class="grey--text">Last update: {{ game.updatedAt }}</span>
                        <span v-else class="grey--text">Broken at: {{ game.brokenAt }}</span>
                        <v-progress-linear :value="75" height="2" color="pink" background-color="transparent"></v-progress-linear>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-card> -->
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </section>
  </div>
</template>

<script>

import firestoreMixin from '@/mixins/firestore'
import PiggyDetail from '@/views/piggies/PiggyDetail.vue'
// import piggy from '@/mixins/piggy'

export default {
  components: {
    AppPiggyDetail: PiggyDetail
  },
  data () {
    return {
      games: []
    }
  },
  mixins: [
    firestoreMixin
  ],
  // mixins: [piggy],
  mounted () {
    this.initialize()
    this.getGame('current')
    this.getGame('previous')
  },
  methods: {
    initialize () {
      // this.dialWs()
      this.getGamesList()
    }
  }
}

</script>

<style scoped>

</style>
