<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-btn
      class="mt-3"
      :class="classButton"
      style="background-color: #FFD700;"
      dark
      large
      slot="activator"
      @click.native="contributeDialog()"
    >
      Contribute
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Contribute</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md v-if="contributeStatus === 'contributing'">
          <v-layout wrap>
            <v-flex xs12 sm6>
              Your ETH contribution*<br />
              (minimum contribution: {{ rateLimitDialog }} ETH)
            </v-flex>
            <v-flex xs12 sm2>
              <v-text-field type="number" number
                v-model="contribution" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm12>
              * Your chances to win the lottery are directly proportional to the amount your contribution(s)
            </v-flex>
            <v-flex xs12 sm12>
              <v-flex xs12 sm12>
                <v-btn block color="warning" dark @click.native="contribute()">Contribute</v-btn>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container grid-list-md v-if="contributeStatus === 'contributed'">
          <v-layout wrap>
            <v-flex xs12 sm6>
              Well done!
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import Web3 from 'web3'
// import Tx from 'ethereumjs-tx'
import Units from 'ethereumjs-units'

let contractAbi = `[{"constant":false,"inputs":[],"name":"breakPiggy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pendingReturnValues","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rateNext","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"localContributionsCounter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newFarmer","type":"address"}],"name":"transferFarmOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastContributionFrequency","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pendingReturnDates","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_withDrawalAddress","type":"address"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_piggyID","type":"uint256"},{"name":"_player","type":"address"}],"name":"getContributionAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newPercentage","type":"uint256"}],"name":"setPercentage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rateLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_v2Address","type":"address"}],"name":"setNewAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nbPiggies","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rateCurrent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"updatePeriod","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"piggies","outputs":[{"name":"piggyID","type":"uint256"},{"name":"value","type":"uint256"},{"name":"open","type":"bool"},{"name":"creationTime","type":"uint256"},{"name":"lastContributionTime","type":"uint256"},{"name":"winner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"forgottenFundsRecovery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"percentage","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"contribute","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"farmer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newUpdatePeriod","type":"uint256"}],"name":"setUpdatePeriod","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_piggyID","type":"uint256"},{"name":"_player","type":"address"}],"name":"getContributionStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_nbPiggies","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"}],"name":"PiggyCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_player","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"NewPiggyContribution","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_winner","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"PiggyBroken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_rateCurrent","type":"uint256"},{"indexed":false,"name":"rateNext","type":"uint256"}],"name":"UpdateRate","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newContract","type":"address"}],"name":"ContractUpgrade","type":"event"}]`

var web3js = window.web3

export default {
  data () {
    return {
      dialog: false,
      contributeStatus: 'contributing',
      contractAddress: '0xd764d4d12f44c49ad3c0b0150668d6c42df44d76',
      nodeUrl: 'wss://ropsten.eth.6120.eu/ws',
      rateLimitDialog: 0,
      contribution: ''
    }
  },
  props: {
    // rateLimit: 0,
    buttonLarge: true
  },
  computed: {
    classButton: function () {
      return {
        'contribute-button': this.buttonLarge
      }
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.now = new Date(Date.UTC())

      if (typeof window.web3 !== 'undefined') {
        web3js = new Web3(web3js.currentProvider)
        // Get piggy data
        // this.getPiggyMinimumContribution()
      }
    },

    // Show dialog
    contributeDialog () {
      console.log('contributeDialog 2:')
      var abi = JSON.parse(contractAbi)
      // Exec contract
      var contract = new web3js.eth.Contract(abi, this.contractAddress)
      console.log('start call get')
      let self = this
      contract.methods.rateLimit().call().then(
        function (rateLimit) {
          rateLimit = Units.convert(rateLimit, 'wei', 'eth')
          contract.methods.rateCurrent().call().then(
            function (rateCurrent) {
              rateCurrent = Units.convert(rateCurrent, 'wei', 'eth')
              contract.methods.rateNext().call().then(
                function (rateNext) {
                  rateNext = Units.convert(rateNext, 'wei', 'eth')
                  let currentLimit = 0

                  // Check next
                  if (rateNext > rateCurrent) {
                    currentLimit = rateNext
                  } else {
                    currentLimit = rateCurrent
                  }

                  // Check limit
                  if (currentLimit < rateLimit) {
                    currentLimit = rateLimit
                  }

                  self.rateLimitDialog = currentLimit
                })
            })
        })
    },
    // Contribute to the piggy
    contribute () {
      let self = this

      web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let defaultAccount = accounts[0]
          var abi = JSON.parse(contractAbi)

          console.log('Contract:', self.contractAddress)
          console.log('contribution:', self.contribution)
          console.log('default Account:', defaultAccount)

          // Exec contract
          var contract = new web3js.eth.Contract(abi, self.contractAddress)
          contract.methods.contribute().send({value: Units.convert(self.contribution, 'eth', 'wei'), from: defaultAccount})
            .on('transactionHash', function (hash) {
              console.log('transactionHash:', hash)
              self.contributeStatus = 'contributed'

              // Change contribution date
              let lastContributionTime = new Date()
              lastContributionTime.setMinutes(lastContributionTime.getMinutes() + 3)
              self.lastContributionTime = self.lastContributionTime
            })
            .on('receipt', function (receipt) {
              console.log('receipt:', receipt)
            })
            .on('confirmation', function (confirmationNumber, receipt) {
              console.log('confirmation:', confirmationNumber, receipt)
            })
            .on('error', function (error) {
              console.log('error:', error)
            })
        })
    }
    /*
    // Get piggy minimum contribution
    getPiggyMinimumContribution (piggy) {
      var abi = JSON.parse(contractAbi)
      // Exec contract
      var contract = new web3js.eth.Contract(abi, this.contractAddress)
      let self = this
      contract.methods.rateCurrent().call().then(
        function (rateCurrent) {
          contract.methods.rateNext().call().then(
            function (rateNext) {
              if (rateNext > rateCurrent) {
                self.rateLimitDialog = Units.convert(rateNext, 'wei', 'eth')
              } else {
                self.rateLimitDialog = Units.convert(rateCurrent, 'wei', 'eth')
              }
            })
        })
    }
    */
  }
}
</script>

<style scoped>

.contribute-button {
  font-size: 42px;
}

</style>
