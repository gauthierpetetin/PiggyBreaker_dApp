<template>
  <div>
    <section>
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <!-- <v-container grid-list-md  :class="blinkClass"> -->
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex md12>
              <h1 class="headline grey-text titles">{{ $t('lang.piggies.currentPiggy') }}</h1>
              <app-piggy-detail :detailGame="currentGame" :maxValue="biggestPiggyValue" class="boxes"></app-piggy-detail>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex md12>
              <h1 class="headline grey-text titles">{{ $t('lang.piggies.pastPiggies') }}</h1>
            </v-flex>
            <v-layout row wrap>
              <v-flex md12>
                <app-piggy-detail v-if="previousGame.value != 0" :detailGame="previousGame" :maxValue="biggestPiggyValue" class="boxes"></app-piggy-detail>
              </v-flex>
            </v-layout>
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

export default {
  components: {
    AppPiggyDetail: PiggyDetail
  },
  data () {
    return {
      games: [],
      blinkClass: {
        blink: false
      }
    }
  },
  mixins: [
    firestoreMixin
  ],
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.getGame('current')
      this.getGame('previous')
      this.getGamesList()
      this.blink()
    },
    blink () {
      let _this = this
      _this.blinkClass.blink = true
      setTimeout(function () {
        _this.blinkClass.blink = false
      }, 2000)
    }
  },
  watch: {
    'fbCurrentGame.id': function (val) {
      this.initialize()
    }
  }
}

</script>

<style scoped>

  .blink {
    background-color: #f2f2f2;
  }

  .titles {
    margin-bottom: 15px
  }

  .boxes {
    margin-bottom: 25px
  }

</style>
