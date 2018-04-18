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
          <h1 class="black--text mb-2 display-2 text-xs-center" style="margin-top: 20px;">
            Your contribution:<br />
            <template v-if="loadingStatus">
              <v-tooltip right>
                <img src="/static/img/icon/loading-blocks-200.svg" alt="loading" height="60" style="vertical-align: middle;margin-left:30px;" slot="activator">
                <span>Your contribution has been submitted successfully. It will require
                50-60 seconds until it gets validated by the whole network.</span>
              </v-tooltip>
            </template>
            <template v-else>
              <strong>{{ contributionAmount }} ETH</strong>
            </template>
          </h1>
          <img src="/static/img/picto/big-piggy.png" alt="big piggy" height="350">
        </v-layout>
        <v-layout row wrap
        class="white--text">
          <v-flex md12 class="text-xs-center">
            <!-- Dialog -->
            <app-dialog button-large="true" @contribute="onContributeChild"></app-dialog>
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
                  <div class="headline text-xs-center howitworks-title">1. You <strong>contribute</strong> with Ethers.</div>
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
                  <div class="headline text-xs-center howitworks-title">2. <strong>Any contributor</strong> can decide to break the Piggy.</div>
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
                      Break the Piggy
                    </v-btn>
                    <v-tooltip right style="top: 5px;">
                      <v-icon slot="activator">info_outline</v-icon>
                      <span>You need to be a contributor to access this feature.<br/>You can’t break the Piggy if a contribution occurred in the last 3 minutes.</span>
                    </v-tooltip>
                    <div class="remaining-time" v-if="breakAvailable == false">
                      <app-countdown v-if="lastContributionTime != null" :date="lastContributionTime" @break="onBreakAvailableChild"></app-countdown>
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center howitworks-title">3. A winner is <strong>chosen randomly</strong> between the contributors.
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
                      :class="[withdrawAvailable ? 'blue' : 'grey']"
                      >
                      Withdraw
                    </v-btn>
                    <v-tooltip right style="top: 5px;">
                      <v-icon slot="activator">info_outline</v-icon>
                      <span>You have no ether (ETH) to withdraw for now.<br/> Contribute to increase your chances to win the next lottery.</span>
                    </v-tooltip>
                    <div class="remaining-time">
                      Your balance: {{ withdrawAmount }} Eth
                    </div>
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

import ethereum from '@/mixins/ethereum'

import Web3 from 'web3'
// import Tx from 'ethereumjs-tx'
import Units from 'ethereumjs-units'

// let web3 = new Web3()
var web3js = window.web3

export default {
  data () {
    return {
      dialog: false,
      now: null,
      lastContributionTime: null,
      contributionAmount: 0,
      withdrawAmount: 0,
      breakAvailable: false,
      withdrawAvailable: false,
      activeBreakClass: 'red',
      contributeStatus: 'contributing',
      contribution: '',
      balance: 0,
      rateLimit: 0,
      timeLimit: 180,
      loadingStatus: true
    }
  },
  mixins: [ethereum],
  components: {
    AppCountdown: Countdown,
    AppDialog: Dialog
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
        this.getLastPiggy()
        this.getPiggyMinimumContribution()
      }

      this.getEvents()
      let self = this
      // Loop to check Metamask status
      var accountInterval = setInterval(function() {
        self.getLastPiggy()
      }, 3000)
    },
    // Get last piggy
    getLastPiggy () {
      console.log('Get last piggy')
      this.loadingStatus = false

      // Exec contract
      var contract = new web3js.eth.Contract(this.abi, this.contractAddress)
      let self = this
      contract.methods.nbPiggies().call().then(
        function (nbPiggies) {
          console.log('Result Piggies: ' + nbPiggies)
          self.retreivedValue = nbPiggies
          contract.methods.piggies(nbPiggies).call().then(
            function (piggy) {
              console.log(piggy)
              // self.currentContribution =
              self.getPiggyBreakable(piggy)
              self.getPiggyValue(piggy)
              self.getPlayerContributionAmount(nbPiggies)
              self.getPlayerWithdrawAmount()
            })
        })
    },
    // Get events
    getEvents () {
      // New web3
      let web3ws = new Web3()
      // Get provider
      web3ws.setProvider(this.nodeUrl)
      var contractWs = new web3ws.eth.Contract(this.abi, this.contractAddress)
      let self = this

      // New piggy contribution
      contractWs.events.NewPiggyContribution({},
        { fromBlock: 'latest' },
        function (error, nbPiggies, sender, value) {
          if (error) {
            console.log(error.stack)
          }
          console.log('NewPiggyContribution:', nbPiggies, sender, value)
          // Refresh piggy info
          self.getLastPiggy()
        })

      // Piggy created
      contractWs.events.PiggyCreated({},
        { fromBlock: 'latest' },
        function (error, piggyID) {
          if (error) {
            console.log(error.stack)
          }
          console.log('PiggyCreated:', piggyID)
          // Refresh piggy info
          self.getLastPiggy()
        })

      // Piggy withdrawal
      contractWs.events.Withdrawal({},
        { fromBlock: 'latest' },
        function (error, value) {
          if (error) {
            console.log(error.stack)
          }
          console.log('withdrawal:', value)
          // Refresh withdrawal info
          self.getPlayerWithdrawAmount()
        })
    },
    // Convert date
    convertDate (d) {
      return d.getFullYear().toString() + '-' +
        ((d.getMonth() + 1).toString().length === 2 ? (d.getMonth() + 1).toString() : '0' +
        (d.getMonth() + 1).toString()) + '-' + (d.getDate().toString().length === 2 ? d.getDate().toString() : '0' +
        d.getDate().toString()) + ' ' + (d.getHours().toString().length === 2 ? d.getHours().toString() : '0' +
        d.getHours().toString()) + ':' +
        ((parseInt(d.getMinutes() / 5) * 5).toString().length === 2 ? (parseInt(d.getMinutes() / 5) * 5).toString() : '0' +
        (parseInt(d.getMinutes() / 5) * 5).toString()) + ':00'
    },
    // Get piggy remaing time
    getPiggyBreakable (piggy) {
      // Exec contract
      var contract = new web3js.eth.Contract(this.abi, this.contractAddress)
      let self = this

      // Get accounts
      web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let defaultAccount = accounts[0]

          // Get contribution status
          contract.methods.getContributionStatus(piggy.piggyID, defaultAccount).call().then(
            function (contributionStatus) {
              if (contributionStatus) {
                // Get time limit
                let lastContributionTimeLimit = new Date(piggy.lastContributionTime * 1000 + (self.timeLimit * 1000))
                // Get current time
                var currentTime = new Date()

                if ((currentTime.getTime() > lastContributionTimeLimit.getTime())) {
                  console.log('Break true')
                  self.breakAvailable = true
                  // this.lastContributionTime = null
                } else {
                  console.log('Break false time')
                  self.breakAvailable = false
                }
                self.lastContributionTime = lastContributionTimeLimit
              } else {
                self.breakAvailable = false
              }
            })
        })
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
      var contract = new web3js.eth.Contract(this.abi, this.contractAddress)
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
      var contract = new web3js.eth.Contract(this.abi, this.contractAddress)
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
    // Get player contribution amount
    getPlayerWithdrawAmount () {
      console.log('Get contribution amount')

      // Exec contract
      var contract = new web3js.eth.Contract(this.abi, this.contractAddress)
      let self = this
      web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let defaultAccount = accounts[0]
          contract.methods.pendingReturnValues(defaultAccount).call().then(
            function (amount) {
              self.withdrawAmount = Units.convert(amount, 'wei', 'eth')
              if (amount > 0) {
                self.withdrawAvailable = true
              } else {
                self.withdrawAvailable = false
              }
            })
        })
    },
    // Break the piggy
    breakPiggy () {
      if (this.breakAvailable === false) {
        return
      }
      let self = this

      web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let defaultAccount = accounts[0]

          console.log('Contract:', self.contractAddress)
          console.log('contribution:', self.contribution)
          console.log('default Account:', defaultAccount)

          // Exec contract
          var contract = new web3js.eth.Contract(self.abi, self.contractAddress)
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
    /*
    // Check withdraw
    checkWithdraw () {
      let self = this

      web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let defaultAccount = accounts[0]

          var contract = new web3js.eth.Contract(self.abi, this.contractAddress)
          console.log('start call get')

          contract.methods.pendingReturnValues(defaultAccount).call()
            .then(function (value) {
              if (value > 0) {
                // SHOW Withdraw
              }
            })
        })
    },
    */
    // Withdraw
    withdrawPiggy () {
      if (this.withdrawAvailable === false) {
        return
      }
      let self = this

      web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let defaultAccount = accounts[0]

          // Exec contract
          var contract = new web3js.eth.Contract(self.abi, self.contractAddress)
          contract.methods.withdraw(defaultAccount).send({from: defaultAccount})
            .on('transactionHash', function (hash) {
              console.log('transactionHash:', hash)
            })
            .on('receipt', function (receipt) {
              console.log('receipt:', receipt)
            })
            .on('confirmation', function (confirmationNumber, receipt) {
              console.log('confirmation:', confirmationNumber, receipt)
              self.getPlayerWithdrawAmount()
            })
            .on('error', function (error) {
              console.log('error:', error)
            })
        })
    },
    // Break available
    onBreakAvailableChild (value) {
      console.log('Break')
      // this.lastContributionTime = false
      this.getLastPiggy()
      // this.breakAvailable = true
    },
    // Contribute
    onContributeChild (value) {
      this.loadingStatus = true
      // console.log('Break')
      // this.getLastPiggy()
      // this.breakAvailable = true
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
