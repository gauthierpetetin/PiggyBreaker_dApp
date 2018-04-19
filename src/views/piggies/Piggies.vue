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

            <v-flex v-for="(piggy, index) in piggies" :key="index" md6 style="margin-bottom: 10px;">
              <v-card>
                <v-layout>
                  <v-flex sm3>
                    <v-card-text>
                      <div>
                        <img v-if="piggy.open === false" src="/static/img/picto/broken-piggy.png" width="100">
                        <img v-if="piggy.open === true" src="/static/img/picto/piggy.png" width="100">
                      </div>
                    </v-card-text>
                  </v-flex>
                  <v-flex sm9>
                    <v-card-title>
                      <div>
                        <span class="grey--text">#{{ piggy.id }}</span><br>
                        <span>Value: {{ piggy.value }} ETH</span><br>
                        <span>Winner: {{ piggy.winner }}</span>
                        <span>Created at: {{ piggy.createdAt }}</span>
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

import piggy from '@/mixins/piggy'

export default {
  data () {
    return {
      piggies: []
    }
  },
  mixins: [piggy],
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.dialWs()
      this.getPiggiesList()
    }
  }
}

</script>

<style scoped>

</style>
