<template>
  <div>

    <section>
      <v-parallax class="parallax-background" height="900">
        <v-layout
          column
          align-center
          justify-center
        >
          <h1 class="black--text mb-2 display-2 text-xs-center" style="margin-top: 20px;">Current Piggy value:<br /><strong>{{ balance }} ETH</strong></h1>
          <h1 class="black--text mb-2 display-2 text-xs-center" style="margin-top: 20px;">Your contribution:<br /><strong>{{ contributionAmount }} ETH</strong></h1>
          <img src="/static/img/picto/big-piggy.png" alt="Vuetify.js" height="350">
        </v-layout>
        <v-layout row wrap
        class="white--text">
          <v-flex md12 class="text-xs-center">
            <!-- Dialog -->
            <app-dialog button-large="true"></app-dialog>
            <!-- /Dialog -->
          </v-flex>
          <v-flex md12 class="text-xs-center black--text" style="font-size:28px">
            Minimum contribution: {{ rateLimit }} ETH
            <v-tooltip right>
              <v-icon slot="activator">info_outline</v-icon>
              <span>The minimum contribution can go up or down with time.<br/>It increases when the frequency of player contributions increases.</span>
            </v-tooltip>
          </v-flex>

        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-layout
        column
        wrap
        class="my-5"
      >
        <v-flex xs12 sm4 class="my-3">
          <div class="text-xs-center">
            <h2 class=" display-2">How does it work?</h2>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center howitworks-title">1. You <strong>contribute</strong> with Ethers</div>
                </v-card-title>
                  <v-card-text class="text-xs-center">
                    <img src="/static/img/picto/1-contribute.png" height="150">
                  </v-card-text>
                  <v-card-text class="text-xs-center">
                    <!-- Dialog -->
                    <app-dialog></app-dialog>
                    <!-- /Dialog -->
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center howitworks-title">2. <strong>Any contributor</strong> can decide to break the Piggy</div>
                </v-card-title>
                  <v-card-text class="text-xs-center">
                    <img src="/static/img/picto/2-break-piggy.png" height="150">
                  </v-card-text>
                  <v-card-text class="text-xs-center">
                    <v-btn
                      class="mt-3"
                      dark
                      large
                      @click.native="breakPiggy()"
                      :class="[breakAvailable ? 'pink' : 'grey']"
                      >
                      Break the Piggy*
                    </v-btn>
                    <v-tooltip right style="top: 5px;">
                      <v-icon slot="activator">info_outline</v-icon>
                      <span>You need to be a contributor to access this feature.<br/>You can’t break the Piggy if a contribution occurred in the last 3 minutes.</span>
                    </v-tooltip>
                    <div class="remaining-time" v-if="breakAvailable == false"><app-countdown v-if="lastContributionTime != null" :date="lastContributionTime"></app-countdown></div>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center howitworks-title">3. A winner is <strong>chosen randomly</strong> between the contributors
                        <v-tooltip right>
                        <v-icon slot="activator">info_outline</v-icon>
                        <span>The more you contribute, the more chances you have to win.<br/>Indeed, your chances to win the lottery are proportional to the total amount of your contributions.</span>
                      </v-tooltip>
                    </div>
                  </v-card-title>
                  <v-card-text class="text-xs-center">
                    <img src="/static/img/picto/3-random-winner.png" height="150">
                  </v-card-text>
                  <v-card-text class="text-xs-center">
                    <v-btn
                      class="mt-3"
                      dark
                      large
                      @click.native="withdrawPiggy()"
                      :class="[breakAvailable ? 'grey' : 'grey']"
                      >
                      Withdraw
                    </v-btn>
                    <v-tooltip right style="top: 5px;">
                      <v-icon slot="activator">info_outline</v-icon>
                      <span>You have no ether (ETH) to withdraw for now.<br/> Contribute to increase your chances to win the next lottery.</span>
                    </v-tooltip>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

  </div>
</template>

<script>
import Countdown from '@/components/Countdown/Countdown.vue'
import Dialog from '@/views/contribute/Dialog.vue'

import Web3 from 'web3'
// import Tx from 'ethereumjs-tx'
import Units from 'ethereumjs-units'

let contractAbi = `[{"constant":false,"inputs":[],"name":"breakPiggy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pendingReturnValues","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rateNext","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"localContributionsCounter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newFarmer","type":"address"}],"name":"transferFarmOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastContributionFrequency","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pendingReturnDates","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_withDrawalAddress","type":"address"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_piggyID","type":"uint256"},{"name":"_player","type":"address"}],"name":"getContributionAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newPercentage","type":"uint256"}],"name":"setPercentage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rateLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_v2Address","type":"address"}],"name":"setNewAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nbPiggies","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rateCurrent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"updatePeriod","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"piggies","outputs":[{"name":"piggyID","type":"uint256"},{"name":"value","type":"uint256"},{"name":"open","type":"bool"},{"name":"creationTime","type":"uint256"},{"name":"lastContributionTime","type":"uint256"},{"name":"winner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"forgottenFundsRecovery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"percentage","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"contribute","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"farmer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newUpdatePeriod","type":"uint256"}],"name":"setUpdatePeriod","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_piggyID","type":"uint256"},{"name":"_player","type":"address"}],"name":"getContributionStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_nbPiggies","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"}],"name":"PiggyCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_player","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"NewPiggyContribution","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_winner","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"PiggyBroken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_rateCurrent","type":"uint256"},{"indexed":false,"name":"rateNext","type":"uint256"}],"name":"UpdateRate","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newContract","type":"address"}],"name":"ContractUpgrade","type":"event"}]`
var abi = JSON.parse(contractAbi)

// let web3 = new Web3()
var web3js = window.web3

export default {
  data () {
    return {
      dialog: false,
      now: null,
      lastContributionTime: null,
      contributionAmount: 0,
      breakAvailable: false,
      activeBreakClass: 'red',
      contributeStatus: 'contributing',
      contribution: '',
      balance: 0,
      contractAddress: '0xd764d4d12f44c49ad3c0b0150668d6c42df44d76',
      nodeUrl: 'wss://ropsten.eth.6120.eu/ws',
      rateLimit: 0,
      timeLimit: 180
    }
  },
  mounted () {
    this.initialize()
  },
  components: {
    AppCountdown: Countdown,
    AppDialog: Dialog
  },
  methods: {
    initialize () {
      this.now = new Date(Date.UTC())

      if (typeof window.web3 !== 'undefined') {
        web3js = new Web3(web3js.currentProvider)
        // Get piggy data
        this.getLastPiggy()
        this.getPiggyMinimumContribution()
      }

      this.getEvents()
    },

    // Get last piggy
    getLastPiggy () {
      console.log('Get last piggy')

      // Exec contract
      var contract = new web3js.eth.Contract(abi, this.contractAddress)
      let self = this
      contract.methods.nbPiggies().call().then(
        function (nbPiggies) {
          console.log('Result Piggies: ' + nbPiggies)
          self.retreivedValue = nbPiggies
          contract.methods.piggies(nbPiggies).call().then(
            function (piggy) {
              console.log(piggy)
              // self.currentContribution =
              self.getPiggyRemainingTime(piggy)
              self.getPiggyValue(piggy)
              self.getPlayerContributionAmount(nbPiggies)
            })
        })
    },

    // Get events
    getEvents () {
      // New web3
      let web3ws = new Web3()
      // Get provider
      web3ws.setProvider(this.nodeUrl)
      var contractWs = new web3ws.eth.Contract(abi, this.contractAddress)
      let self = this
      contractWs.events.NewPiggyContribution({},
        { fromBlock: 'latest' },
        function (error, nbPiggies, sender, value) {
          if (error) {
            console.log(error.stack)
          }
          console.log('Event:', nbPiggies, sender, value)
          // Refresh piggy info
          self.getLastPiggy()
        })
    },

    convertDate(d) {
      return d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00"
    },

    // Get piggy remaing time
    getPiggyRemainingTime (piggy) {
      // Get time limit
      let lastContributionTimeLimit = new Date(piggy.lastContributionTime * 1000 + (this.timeLimit * 1000))
      // lastContributionTimeLimit = new Date(this.convertDate(lastContributionTimeLimit))

      // Get current time
      var currentTime = new Date()

      if ((currentTime.getTime() > lastContributionTimeLimit.getTime())) {
        console.log('Break true')
        this.breakAvailable = true
        this.lastContributionTime = null
      } else {
        console.log('Break false')
        this.breakAvailable = false
      }

      this.lastContributionTime = lastContributionTimeLimit
    },

    // Get piggy value
    getPiggyValue (piggy) {
      console.log('Get balance: ' + piggy.value)
      let balance = Units.convert(piggy.value, 'wei', 'eth')
      this.balance = balance
    },

    // Get piggy minimum contribution
    getPiggyMinimumContribution (piggy) {
      // Exec contract
      var contract = new web3js.eth.Contract(abi, this.contractAddress)
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

                  self.rateLimit = currentLimit
                })
            })
        })
    },

    // Get player contribution amount
    getPlayerContributionAmount (piggyNb) {
      console.log('Get contribution amount')

      // Exec contract
      var contract = new web3js.eth.Contract(abi, this.contractAddress)
      let self = this
      web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let defaultAccount = accounts[0]
          contract.methods.getContributionAmount(piggyNb, defaultAccount).call().then(
            function (amount) {
              console.log('Result amount: ' + amount)
              self.contributionAmount = Units.convert(amount, 'wei', 'eth')
            })
        })
    },

    // Break the piggy
    breakPiggy () {
      let self = this

      web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let defaultAccount = accounts[0]

          console.log('Contract:', self.contractAddress)
          console.log('contribution:', self.contribution)
          console.log('default Account:', defaultAccount)

          // Exec contract
          var contract = new web3js.eth.Contract(abi, self.contractAddress)
          contract.methods.breakPiggy().send({from: defaultAccount})
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

    // Check withdraw
    checkWithdraw () {
      web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let defaultAccount = accounts[0]

          var contract = new web3js.eth.Contract(abi, this.contractAddress)
          console.log('start call get')

          contract.methods.pendingReturnValues(defaultAccount).call()
            .then(function (value) {
              if (value > 0) {
                // SHOW Withdraw
              }
            })
        })
    },

    // Withdraw
    withdrawPiggy () {
      let self = this

      web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let defaultAccount = accounts[0]

          // Exec contract
          var contract = new web3js.eth.Contract(abi, self.contractAddress)
          contract.methods.withdraw(defaultAccount).send({from: defaultAccount})
            .on('transactionHash', function (hash) {
              console.log('transactionHash:', hash)
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

<style scoped>
.parallax-background {
  background-image: url("/static/img/background/background-piggies.jpg");
  background-repeat: repeat;
  background-size: 426px 201px;
}

.remaining-time {
  color: #a2a2a2;
  font-weight: bold;
  font-size: 16px;
  margin-left: 15px;
}

.activeBreak {
  background-color: #ff0000;
}

.howitworks-title {
  min-height: 50px;
}

</style>
