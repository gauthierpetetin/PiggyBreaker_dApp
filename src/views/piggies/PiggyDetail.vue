<template>
  <div>
    <v-card>
      <v-layout>
        <v-flex sm3>
          <v-card-text>
            <div class="text-md-center">
              <img v-if="detailGame.open === true" src="/static/img/picto/piggy.png" width="100" max-height="100">
              <img v-else src="/static/img/picto/2-break-piggy.png" width="100" max-height="100">
              <h1 class="pink--text">{{ detailGame.value }} ETH</h1>
              <v-progress-linear :value="percentage" height="4" color="pink" background-color="transparent"></v-progress-linear>
            </div>
          </v-card-text>
        </v-flex>
        <v-flex sm9>
          <v-card-title>
            <div style="width: 90%">
              <span class="grey--text headline">Piggy #{{ detailGame.id }}</span><br /><br />
              <h1 v-if="detailGame.open === true" class="blue--text title"><strong>Game still on-going..</strong></h1>
              <h1 v-if="(detailGame.open === false) && detailGame.winner && (detailGame.winner !== '0x0000000000000000000000000000000000000000')" class="warning--text title"><strong>Winner</strong>: {{ detailGame.winner }}</h1>
              <h1 v-if="(detailGame.open === false) && ((!detailGame.winner) || (detailGame.winner === '0x0000000000000000000000000000000000000000'))" class="warning--text title">
                <strong>Winner</strong>:
                <v-tooltip right>
                  <v-icon slot="activator" class="warning--text">fas fa-crosshairs fa-pulse</v-icon>
                  <span>The previous winner becomes public once the next lottery has started,<br />e.g. once Piggy#{{ detailGame.id + 1 }} contains at least one contribution.</span>
                </v-tooltip>
              </h1>
              <br />
              <span><strong>{{ detailGame.nbContributions }}</strong> contributions</span><br />
              <span class="grey--text">Created at: {{ detailGame.createdAt }}</span><br />
              <span v-if="detailGame.open" class="grey--text">Last contribution: {{ detailGame.updatedAt }}</span>
              <span v-else class="grey--text">Broken at: {{ detailGame.brokenAt }}</span>
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
    detailGame: null,
    maxValue: null
  },
  computed: {
    percentage: function () {
      if (!isNaN(this.maxValue) && (this.maxValue !== 0)) {
        return Math.max(100 * this.detailGame.value / this.maxValue, 3)
      } else {
        return 1
      }
    }
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
