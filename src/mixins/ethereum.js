import Web3 from 'web3'
import web3plus from 'web3-plus'
import Units from 'ethereumjs-units'
import { eventBus } from '../main'

// var abi =
export default {
  data () {
    return {
      // ALL OTHER VARIABLES ARE GLOBAL (Cf. store.js)
      // Metamask
      web3js: window.web3,
      metamaskDialog: false,
      waitDialog: false
    }
  },
  created () {
    if (this.masterEthereumMixin) {
      console.log('Event catcher created.')
      eventBus.$on('new_piggy', this.getEthGameData)
    }
  },
  computed: {
    contractAddress () {
      return this.$store.state.contract.address
    },
    abi () {
      return this.$store.state.contract.abi
    },
    player () {
      return this.$store.state.ethPlayer
    },
    transaction () {
      return this.$store.state.ethTransaction
    },
    ethGame () {
      return this.$store.state.ethGame
    },
    loading () {
      return this.$store.state.ethLoading
    }
  },
  methods: {
    /*************
      METAMASK
    *************/
    // Dial node
    dialJs () {
      // Get provider
      if (typeof window.web3 !== 'undefined') {
        this.web3js = new Web3(this.web3js.currentProvider)
      }
    },
    // Loop check Metamask
    loopMetamask () {
      // Loop to check Metamask status
      let self = this
      self.$store.state.metamaskInterval = setInterval(function () {
        self.checkMetamask()
      }, 3000)
    },
    // Check Metamask
    checkMetamask () {
      // console.log('CHECKMETAMASK')
      let self = this
      // Check metamask status
      web3plus.metamask.checkNetwork().then(response => {
        // console.log('checkMetamask response: ', response)
        self.$store.state.ethTransaction.checked = true
        if (response.status === 'error') {
          if (response.message === 'NOT_INSTALLED') {
            self.$store.state.ethTransaction.enable = false
            self.$store.state.ethTransaction.status = 'not_installed'
            self.$store.state.metamaskEnabled = false
          } else if (response.message === 'NOT_LOGGED_IN') {
            self.$store.state.ethTransaction.enable = false
            self.$store.state.ethTransaction.status = 'locked'
            self.$store.state.metamaskEnabled = false
          }
        } else if (response.status === 'success') {
          if (response.networkId !== 1 && response.networkId !== 3) {
            self.$store.state.ethTransaction.enable = false
            self.$store.state.ethTransaction.status = 'wrong_network'
            self.$store.state.metamaskEnabled = false
          } else if (response.networkId === 1 && process.env.ETHEREUM_NODE_ENV === 'development') {
            self.$store.state.ethTransaction.enable = false
            self.$store.state.ethTransaction.status = 'wrong_network'
            self.$store.state.metamaskEnabled = false
          } else if (response.networkId === 3 && process.env.ETHEREUM_NODE_ENV === 'production') {
            self.$store.state.ethTransaction.enable = false
            self.$store.state.ethTransaction.status = 'wrong_network'
            self.$store.state.metamaskEnabled = false
          } else {
            self.$store.state.ethTransaction.enable = true
            self.$store.state.metamaskEnabled = true
            self.checkPlayer(response.address)
          }
        }
      })
    },
    checkPlayer (newAddress) {
      if (newAddress !== this.player.address) {
        console.log('CHECKPLAYER: ', newAddress)
        this.getEthGameData()
      }
    },
    // Get player email
    getPlayerAddress () {
      let self = this
      // Dial node
      self.dialJs()
      // Return a new promise.
      return new Promise(function (resolve, reject) {
        // Get accounts
        self.web3js.eth.getAccounts()
          .then(function (accounts) {
            console.log('getPlayerAddress', accounts[0])
            if (self.player.address !== accounts[0]) {
              self.$store.state.ethPlayer.address = accounts[0]
            }
            // Get player ethData
            self.getEthPlayerBreakEnable(self.ethGame, self.player.address)
            self.getEthPlayerWithdrawEnable(self.player.address)
            resolve(accounts[0])
          })
      })
    },
    // Get player
    getEthGameData () {
      console.log('getEthGameData')
      let self = this
      if (self.web3js) {
        // Dial node
        self.dialJs()

        if (self.abi && self.contractAddress) {
          // Get contract
          var contract = new self.web3js.eth.Contract(self.abi, self.contractAddress)
          // console.log('abi', self.abi)
          // console.log('contractAddress', self.contractAddress)
          // console.log('contract', contract)
          // Get current Piggy
          contract.methods.nbPiggies().call().then(
            function (piggyId) {
              console.log('Piggy ID : ', piggyId)
              contract.methods.piggies(piggyId).call().then(
                function (ethGame) {
                  console.log('Ethgame : ', ethGame)
                  // Set game id
                  self.$store.state.ethGame.id = ethGame.piggyID
                  // Set piggy value
                  self.$store.state.ethGame.value = Units.convert(ethGame.value, 'wei', 'eth')
                  // Get accounts
                  self.getPlayerAddress()
                })
            })
        }
      }
    },
    //  Get player break allowance
    getEthPlayerBreakEnable (ethGame, currentAccount) {
      console.log('getEthPlayerBreakEnable : ', ethGame, 'currentAccount : ', currentAccount)
      let self = this
      if (this.abi && this.contractAddress) {
        // Get contract
        var contract = new self.web3js.eth.Contract(self.abi, self.contractAddress)
        // Get contribution amount
        contract.methods.getContributionAmount(ethGame.id, currentAccount).call().then(
          function (contributionAmount) {
            self.$store.state.ethPlayer.contributionBalance = Units.convert(contributionAmount, 'wei', 'eth')
            // Check if break enable
            console.log('Check if break enable : ', contributionAmount)
            if (contributionAmount > 0) {
              self.$store.state.ethPlayer.breakEnable = true
            } else {
              self.$store.state.ethPlayer.breakEnable = false
            }
          })
      }
    },
    // Get player withdraw amount
    getEthPlayerWithdrawEnable (playerAddress) {
      let self = this
      if (this.abi && this.contractAddress) {
        // Get contract
        var contract = new self.web3js.eth.Contract(this.abi, this.contractAddress)
        // Get withdraw amount
        contract.methods.pendingReturnValues(playerAddress).call().then(
          function (amount) {
            self.$store.state.ethPlayer.withdrawBalance = Units.convert(amount, 'wei', 'eth')
            // Check if withdraw enable
            if (amount > 0) {
              self.$store.state.ethPlayer.withdrawEnable = true
            } else {
              self.$store.state.ethPlayer.withdrawEnable = false
            }
          })
      }
    },
    /*************
      Contribution
    *************/
    // Contribute to the piggy
    contributePiggy (playerContribution, minContribution) {
      let self = this

      self.contributionStatus = 'contributing'

      // Format contribution
      playerContribution = playerContribution.replace(/,/g, '.')
      playerContribution = playerContribution.replace(/^\./g, '0.')

      // Check user contribution
      if (playerContribution === '') {
        self.contributionError = this.$t('lang.ethereummixin.contributionNotValid')
        return false
      } else if (playerContribution < minContribution) {
        self.contributionError = this.$t('lang.ethereummixin.contributionTooLow') + ' (' + minContribution + ')'
        return false
      }

      // Dial node
      self.dialJs()

      // Contribute
      self.web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let currentAddress = accounts[0]

          if (self.abi && self.contractAddress) {
            // Get contract
            var contract = new self.web3js.eth.Contract(self.abi, self.contractAddress)
            // Send contribution
            contract.methods.contribute().send({value: Units.convert(playerContribution, 'eth', 'wei'), from: currentAddress})
              .on('transactionHash', function (hash) {
                console.log('as contributed', hash)
                self.contributionStatus = 'contributed'
                self.$store.state.ethLoading.contribution = true
                self.$store.state.ethPendingTx = hash
                self.dialog = true
              })
              .on('receipt', function (receipt) {
                console.log('Contribution receipt:', receipt)
                self.$store.state.ethLoading.contribution = false
                self.getEthGameData()
                self.notify(self.$t('lang.ethereummixin.notification.contribute.title'), self.$t('lang.ethereummixin.notification.contribute.text'))
              })
              .on('confirmation', function (confirmationNumber, receipt) {
                // console.log('confirmation:', confirmationNumber, receipt)
              })
              .on('error', function (error) {
                console.log('error:', error)
              })
          }
        })
    },
    // Break the piggy
    breakPiggy () {
      console.log('breakPiggy')
      let self = this
      // Dial node
      self.dialJs()
      // Get accounts
      self.web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let currentAddress = accounts[0]

          if (self.abi && self.contractAddress) {
            // Get contract
            var contract = new self.web3js.eth.Contract(self.abi, self.contractAddress)
            // Break piggy
            contract.methods.breakPiggy().send({from: currentAddress})
              .on('transactionHash', function (hash) {
                console.log('transactionHash:', hash)
                // self.contributeStatus = 'contributed'
                self.$store.state.ethLoading.break = true
                self.$store.state.ethPendingTx = hash
              })
              .on('receipt', function (receipt) {
                console.log('Broken Piggy receipt:', receipt)
                self.$store.state.ethLoading.break = false
                self.getEthGameData()
                self.notify(self.$t('lang.ethereummixin.notification.break.title'), self.$t('lang.ethereummixin.notification.break.text'))
              })
              .on('confirmation', function (confirmationNumber, receipt) {
                // console.log('confirmation:', confirmationNumber, receipt)
              })
              .on('error', function (error) {
                console.log('error:', error)
              })
          }
        })
    },
    // Withdraw
    withdrawPiggy () {
      console.log('Withdraw!')
      let self = this
      // Dial node
      self.dialJs()
      // Get accounts
      self.web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let currentAddress = accounts[0]

          if (self.abi && self.contractAddress) {
            // Exec contract
            var contract = new self.web3js.eth.Contract(self.abi, self.contractAddress)
            contract.methods.withdraw(currentAddress).send({from: currentAddress})
              .on('transactionHash', function (hash) {
                console.log('transactionHash:', hash)
                self.$store.state.ethLoading.withdraw = true
                self.$store.state.ethPendingTx = hash
              })
              .on('receipt', function (receipt) {
                console.log('Withdrawal receipt:', receipt)
                self.$store.state.ethLoading.withdraw = false
                self.getEthGameData()
                self.notify(self.$t('lang.ethereummixin.notification.withdraw.title'), self.$t('lang.ethereummixin.notification.withdraw.text'))
              })
              .on('confirmation', function (confirmationNumber, receipt) {
                // console.log('confirmation:', confirmationNumber, receipt)
              })
              .on('error', function (error) {
                console.log('error:', error)
              })
          }
        })
    },
    closeMetamaskDialog () {
      this.metamaskDialog = false
    },
    closeWaitDialog () {
      this.waitDialog = false
    },
    notify (notifTitle, notifMessage) {
      // https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification#Parameters
      this.$notification.show(notifTitle, {
        body: notifMessage
      }, {})
    }
  }
}
