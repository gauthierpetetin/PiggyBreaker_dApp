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
              <h1 class="headline">Piggies List</h1>
            </v-flex>

            <v-flex v-for="(game, index) in games" :key="index" md6 style="margin-bottom: 10px;">
              <v-card>
                <v-layout>
                  <v-flex sm3>
                    <v-card-text>
                      <div class="text-md-center">
                        <img v-if="game.open === false" src="/static/img/picto/broken-piggy.png" width="100">
                        <img v-if="game.open === true" src="/static/img/picto/piggy.png" width="100">
                        <h3>{{ game.value }} ETH</h3>
                      </div>
                    </v-card-text>
                  </v-flex>
                  <v-flex sm9>
                    <v-card-title>
                      <div>
                        <h1 class="grey--text">#{{ game.id }}</h1>
                        <h3 v-if="game.open === false">Winner: {{ game.winner }}</h3>
                        <br />
                        <span><strong>{{ game.nbContributions }}</strong> contributions</span><br />
                        <span>Created at: {{ game.createdAt }}</span><br />
                        <span v-if="game.open">Last update: {{ game.updatedAt }}</span>
                        <span v-else>Breaked at: {{ game.breakedAt }}</span>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </section>
  </div>
</template>

<script>

import firestoreMixin from '@/mixins/firestore'
// import piggy from '@/mixins/piggy'

export default {
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
