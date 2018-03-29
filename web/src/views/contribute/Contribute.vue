<template>
  <div>

    <section>
      <v-parallax class="parallax-background" height="600">
        <v-layout
          column
          align-center
          justify-center
        >
          <h1 class="black--text mb-2 display-2 text-xs-center" style="margin-top: 20px;">Current Piggy value: {{ balance }} ETH</h1>
          <img src="/static/img/picto/big-piggy.png" alt="Vuetify.js" height="350">
        </v-layout>
        <v-layout row wrap
        class="white--text">
          <v-flex md6 class="text-xs-right">
            <v-dialog v-model="dialog" persistent max-width="800px">
              <v-btn
                class="blue lighten-2 mt-5"
                dark
                large
                slot="activator"
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
                        (minimum contribution: 0.01ETH)
                      </v-flex>
                      <v-flex xs12 sm2>
                        <v-text-field type="number" number
                          v-model="contribution" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12>
                        *Your chances to win the lottery are directly proportional to the amount your contribution(s)
                      </v-flex>
                      <v-flex xs12 sm12>
                        <v-btn block color="warning" dark @click.native="contribute()">Contribute</v-btn>
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
          </v-flex>
          <v-flex md6 class="text-xs-left">
            <v-btn
              class="grey  mt-5"
              dark
              large
              href="/pre-made-themes"
            >
              Break the Piggy*
            </v-btn>
            <div class="remaining-time"><countdown date="2018-03-30 23:00:00"></countdown></div>
          </v-flex>
        </v-layout>
      </v-parallax>
    </section>

  </div>
</template>
<script>
import Countdown from '@/components/Countdown/Countdown.vue'

import Web3 from 'web3'
// import Tx from 'ethereumjs-tx'
import Units from 'ethereumjs-units'

let contractAbi = `[{"constant":false,"inputs":[],"name":"breakPiggy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pendingReturnValues","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rateNext","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"localContributionsCounter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newFarmer","type":"address"}],"name":"transferFarmOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastContributionFrequency","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pendingReturnDates","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_withDrawalAddress","type":"address"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newPercentage","type":"uint256"}],"name":"setPercentage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rateLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_v2Address","type":"address"}],"name":"setNewAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nbPiggies","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rateCurrent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"updatePeriod","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"piggies","outputs":[{"name":"piggyID","type":"uint256"},{"name":"value","type":"uint256"},{"name":"open","type":"bool"},{"name":"creationTime","type":"uint256"},{"name":"lastContributionTime","type":"uint256"},{"name":"winner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"forgottenFundsRecovery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"percentage","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"contribute","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"farmer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newUpdatePeriod","type":"uint256"}],"name":"setUpdatePeriod","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_nbPiggies","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"}],"name":"PiggyCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_player","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"NewPiggyContribution","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_winner","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"PiggyBroken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_rateCurrent","type":"uint256"},{"indexed":false,"name":"rateNext","type":"uint256"}],"name":"UpdateRate","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newContract","type":"address"}],"name":"ContractUpgrade","type":"event"}]`

// let web3 = new Web3()
var web3js = window.web3

export default {
  data () {
    return {
      dialog: false,
      contributeStatus: 'contributing',
      contribution: '',
      balance: 0,
      contractAddress: '0x2378575da1f3ffc60ae34279ab0386904cf477f7',
      nodeUrl: 'wss://ropsten.eth.6120.eu/ws'
    }
  },
  mounted () {
    this.initialize()
  },
  components: {
    Countdown
  },
  methods: {
    initialize () {
      if (typeof window.web3 !== 'undefined') {
        web3js = new Web3(web3js.currentProvider)
        this.getBalance(this.contractAddress)
      }
      // Get provider
      // web3.setProvider(this.nodeUrl)
      //
      // console.log('Connected to node')
      //
    },
    getBalance (address) {
      console.log('Get contract value')

      // Get balance
      let self = this
      web3js.eth.getBalance(address)
        .then(function (balance) {
          console.log('Get balance: ' + balance)
          balance = Units.convert(balance, 'wei', 'eth')
          self.balance = balance
        })
    },
    contribute () {
      let self = this

      // let web3Provider = web3.currentProvider
      // console.log('existing web3: provider', typeof web3, web3.currentProvider)

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
    },
    breakPiggy () {
      let self = this

      // let web3Provider = web3.currentProvider
      // console.log('existing web3: provider', typeof web3, web3.currentProvider)

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
  }
}
</script>

<style>
.parallax-background {
    background-image: url("/static/img/background/pattern-tile.svg");
    background-repeat: repeat;
    background-size: 400px 230px;
}

.remaining-time {
  color: #a2a2a2;
  font-weight: bold;
  font-size: 16px;
  margin-left: 15px;
}
</style>
