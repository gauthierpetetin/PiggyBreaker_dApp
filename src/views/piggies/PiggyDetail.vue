<template>
  <div>
    <v-card>
      <v-layout>
        <v-flex sm3>
          <v-card-text>
            <div class="text-md-center">
              <img v-if="detailGame.open === false" src="/static/img/picto/broken-piggy.png" width="100">
              <img v-if="detailGame.open === true" src="/static/img/picto/piggy.png" width="100">
              <h3 class="pink--text">{{ detailGame.value }} ETH</h3>
            </div>
          </v-card-text>
        </v-flex>
        <v-flex sm9>
          <v-card-title>
            <div style="width: 90%">
              <h1 class="grey--text">#{{ detailGame.id }}</h1>
              <h3 v-if="detailGame.open === false">Winner: {{ detailGame.winner }}</h3>
              <br />
              <span><strong>{{ detailGame.nbContributions }}</strong> contributions</span><br />
              <span class="grey--text">Created at: {{ detailGame.createdAt }}</span><br />
              <span v-if="detailGame.open" class="grey--text">Last update: {{ detailGame.updatedAt }}</span>
              <span v-else class="grey--text">Broken at: {{ detailGame.brokenAt }}</span>
              <v-progress-linear :value="75" height="2" color="pink" background-color="transparent"></v-progress-linear>
            </div>
          </v-card-title>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>

export default {
  props: {
    detailGame: null
  },
  data () {
    return {
      games: []
    }
  }
}

</script>

<style scoped>

</style>
