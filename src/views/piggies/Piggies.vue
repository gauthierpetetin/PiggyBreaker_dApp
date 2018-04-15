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
import Web3 from 'web3'
// import Tx from 'ethereumjs-tx'
import Units from 'ethereumjs-units'

import ethereum from '@/mixins/ethereum'

// let web3 = new Web3()
var web3js = window.web3

export default {
  data () {
    return {
      piggies: []
    }
  },
  mixins: [ethereum],
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      if (typeof window.web3 !== 'undefined') {
        web3js = new Web3(web3js.currentProvider)
      }

      // Exec contract
      var contract = new web3js.eth.Contract(this.abi, this.contractAddress)

      let self = this
      contract.methods.nbPiggies().call().then(
        function (nbPiggies) {
          self.retreivedValue = nbPiggies

          for (let i = nbPiggies; i >= 1; i--) {
            contract.methods.piggies(i).call().then(
              function (piggyItem) {
                console.log('Get contract value', piggyItem.creationTime)
                let createdAt = new Date(piggyItem.creationTime * 1000)
                var piggy = {
                  id: piggyItem.piggyID,
                  value: Units.convert(piggyItem.value, 'wei', 'eth'),
                  open: piggyItem.open,
                  createdAt: createdAt,
                  winner: piggyItem.winner
                }
                // self.piggies.push(piggy)
                self.piggies.splice(nbPiggies - piggyItem.piggyID, 0, piggy)
                console.log(piggy)
              }
            )
          }
        })
    }
  }
}

</script>

<style scoped>

</style>
