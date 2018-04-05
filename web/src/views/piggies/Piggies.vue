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
            <v-flex sm6 v-for="(piggy, index) in piggies" :key="index" style="background-color:#f6f6f6;padding: 5px;">
              <v-card class="elevation-0 transparent">
                <v-layout row justify-space-around>
                  <v-flex sm3 text-md-center>
                    <img src="/static/img/picto/big-piggy.png" width="80">
                  </v-flex>
                  <v-flex sm9>
                    Id: {{ piggy.id }}<br />
                    Value: {{ piggy.value }} ETH<br />
                    Open: {{ piggy.open }}<br />
                    Created at: {{ piggy.createdAt }}<br />
                    Winner: {{ piggy.winner }}
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

let contractAbi = `[{"constant":false,"inputs":[],"name":"breakPiggy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pendingReturnValues","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rateNext","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"localContributionsCounter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newFarmer","type":"address"}],"name":"transferFarmOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastContributionFrequency","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pendingReturnDates","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_withDrawalAddress","type":"address"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_piggyID","type":"uint256"},{"name":"_player","type":"address"}],"name":"getContributionAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newPercentage","type":"uint256"}],"name":"setPercentage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rateLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_v2Address","type":"address"}],"name":"setNewAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nbPiggies","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rateCurrent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"updatePeriod","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"piggies","outputs":[{"name":"piggyID","type":"uint256"},{"name":"value","type":"uint256"},{"name":"open","type":"bool"},{"name":"creationTime","type":"uint256"},{"name":"lastContributionTime","type":"uint256"},{"name":"winner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"forgottenFundsRecovery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"percentage","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"contribute","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"farmer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newUpdatePeriod","type":"uint256"}],"name":"setUpdatePeriod","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_piggyID","type":"uint256"},{"name":"_player","type":"address"}],"name":"getContributionStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_nbPiggies","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"}],"name":"PiggyCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_player","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"NewPiggyContribution","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_winner","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"PiggyBroken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_rateCurrent","type":"uint256"},{"indexed":false,"name":"rateNext","type":"uint256"}],"name":"UpdateRate","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newContract","type":"address"}],"name":"ContractUpgrade","type":"event"}]`

// let web3 = new Web3()
var web3js = window.web3

export default {
  data () {
    return {
      contractAddress: '0xd764d4d12f44c49ad3c0b0150668d6c42df44d76',
      piggies: []
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      if (typeof window.web3 !== 'undefined') {
        web3js = new Web3(web3js.currentProvider)
      }

      var abi = JSON.parse(contractAbi)
      // Exec contract
      var contract = new web3js.eth.Contract(abi, this.contractAddress)

      let self = this
      contract.methods.nbPiggies().call().then(
        function (nbPiggies) {
          self.retreivedValue = nbPiggies

          for (let i = 0; i < nbPiggies; i++) {
            contract.methods.piggies(nbPiggies).call().then(
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
                self.piggies.push(piggy)
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
