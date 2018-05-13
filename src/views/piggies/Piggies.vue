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
              <h1 class="headline grey-text titles">Current Piggy</h1>
              <app-piggy-detail :detailGame="currentGame" :maxValue="biggestPiggyValue" class="boxes"></app-piggy-detail>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex md12>
              <h1 class="headline grey-text titles">Previous Piggy</h1>
              <app-piggy-detail :detailGame="previousGame" :maxValue="biggestPiggyValue" class="boxes"></app-piggy-detail>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex md12>
              <h1 class="headline grey-text titles">Past Piggies</h1>
            </v-flex>
            <v-flex v-for="(game, index) in games" :key="index" md12 style="margin-bottom: 10px;">
              <app-piggy-detail :detailGame="game" :maxValue="biggestPiggyValue" class="boxes"></app-piggy-detail>
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
  },
  methods: {
    initialize () {
      this.getGame('current')
      this.getGame('previous')
      this.getGamesList()
    }
  }
}

</script>

<style scoped>

  .titles {
    margin-bottom: 15px
  }

  .boxes {
    margin-bottom: 25px
  }

</style>
