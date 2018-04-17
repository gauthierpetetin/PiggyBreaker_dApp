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
            <v-flex v-if="contributionError" xs12 sm12>
              <v-alert outline color="error" icon="warning" :value="true">
                {{ contributionError }}
              </v-alert>
            </v-flex>
            <v-flex xs12 sm12>
              * Your chances to win the lottery are directly proportional to the amount your contribution(s)
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
</template>

<script>

import Web3 from 'web3'
// import Tx from 'ethereumjs-tx'
import Units from 'ethereumjs-units'

import ethereum from '@/mixins/ethereum'

var web3js = window.web3

export default {
  data () {
    return {
      dialog: false,
      contributeStatus: 'contributing',
      rateLimitDialog: 0,
      contribution: '',
      contributionError: ''
    }
  },
  mixins: [ethereum],
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
      console.log('contributeDialog:')
      this.contributeStatus = 'contributing'

      // Exec contract
      var contract = new web3js.eth.Contract(this.abi, this.contractAddress)
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
      let userContribution = self.contribution.replace(/,/g, '.')
      userContribution = userContribution.replace(/^\./g, '0.')
      
      // Check user contribution
      if (userContribution === '') {
        this.contributionError = 'You must enter a valid contribution'
        return false
      } else if (userContribution < this.rateLimitDialog) {
        this.contributionError = 'Your contribution is under the limit (' + this.rateLimitDialog + ')'
        return false
      }
      // Contribute
      web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let defaultAccount = accounts[0]

          console.log('Contract:', self.contractAddress)
          console.log('default Account:', defaultAccount)

          // Exec contract
          var contract = new web3js.eth.Contract(self.abi, self.contractAddress)
          contract.methods.contribute().send({value: Units.convert(userContribution, 'eth', 'wei'), from: defaultAccount})
            .on('transactionHash', function (hash) {
              console.log('transactionHash:', hash)
              self.contributeStatus = 'contributed'

              // Change contribution date
              let lastContributionTime = new Date()
              lastContributionTime.setMinutes(lastContributionTime.getMinutes() + 3)
              self.lastContributionTime = self.lastContributionTime
              // Send to parent
              self.$emit('contribute', true)
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

.contribute-button {
  font-size: 42px;
}

</style>
