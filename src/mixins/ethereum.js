
import Web3 from 'web3'
import Units from 'ethereumjs-units'

// var abi =
export default {
  data () {
    return {
      // Contract
      abi: JSON.parse(process.env.ETHEREUM_ABI),
      contractAddress: process.env.ETHEREUM_CONTRACT,
      // Metamask
      web3js: window.web3,
      // Game
      ethGame: {
        id: null,
        value: null
      },
      // Player
      player: {
        address: null,
        email: null,
        contributionValue: null,
        contributionBalance: 0,
        withdrawBalance: 0,
        breakEnable: false,
        withdrawEnable: false
      },
      // Contribution
      contribution: {
        enable: false,
        status: null
      },
      metamaskDialog: false,
      waitDialog: false
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
      setInterval(function () {
        self.checkMetamask()
      }, 3000)
    },
    // Check Metamask
    checkMetamask () {
      let self = this

      // Dial node
      self.dialJs()

      // Check if installed
      if (typeof web3 === 'undefined') {
        self.contribution.enable = false
        self.contribution.status = 'not_installed'
        self.$store.state.metamaskEnabled = false
        return
      }

      // Check if installed
      if (!self.web3js.currentProvider.isMetaMask) {
        self.contribution.enable = false
        self.contribution.status = 'not_installed'
        self.$store.state.metamaskEnabled = false
        return
      }

      // Get accounts
      self.web3js.eth.getAccounts()
        .then(function (accounts) {
          if (accounts.length === 0) {
            self.contribution.enable = false
            self.contribution.status = 'locked'
            self.$store.state.metamaskEnabled = false
          } else {
            // Check if on good network
            self.web3js.eth.net.getId().then(
              function (netId) {
                if (netId === 1) {
                  if (process.env.ETHEREUM_NODE_ENV === 'development') {
                    self.contribution.enable = false
                    self.contribution.status = 'wrong_network'
                    self.$store.state.metamaskEnabled = false
                  } else {
                    self.contribution.enable = true
                    self.$store.state.metamaskEnabled = true
                    self.checkPlayer(accounts[0])
                  }
                } else if (netId === 3) {
                  if (process.env.ETHEREUM_NODE_ENV === 'production') {
                    self.contribution.enable = false
                    self.contribution.status = 'wrong_network'
                    self.$store.state.metamaskEnabled = false
                  } else {
                    self.contribution.enable = true
                    self.$store.state.metamaskEnabled = true
                    self.checkPlayer(accounts[0])
                  }
                } else {
                  self.contribution.enable = false
                  self.contribution.status = 'wrong_network'
                  self.$store.state.metamaskEnabled = false
                }
              })
          }
        })
    },
    checkPlayer (newAddress) {
      if (newAddress !== this.player.address) {
        this.getEthPlayerData()
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
            console.log(accounts[0])
            resolve(accounts[0])
          })
      })
    },
    // Get player
    getEthPlayerData () {
      let self = this

      if (self.web3js) {
        // Dial node
        self.dialJs()

        // Get contract
        var contract = new self.web3js.eth.Contract(this.abi, this.contractAddress)

        // Get current Piggy
        contract.methods.nbPiggies().call().then(
          function (piggyId) {
            // console.log('PIGGGGGGY: ', piggyId)
            contract.methods.piggies(piggyId).call().then(
              function (ethGame) {
                // console.log('ETHGAAAME: ', ethGame)
                // Set game id
                self.ethGame.id = ethGame.piggyID
                // Set piggy value
                self.ethGame.value = Units.convert(ethGame.value, 'wei', 'eth')
                // Get accounts
                self.web3js.eth.getAccounts()
                  .then(function (accounts) {
                    console.log(accounts)
                    self.player.address = accounts[0]
                    console.log(self.player)
                    // Get player data
                    self.getPlayerContributionBalance(self.ethGame, self.player.address)
                    self.getPlayerBreakEnable(self.ethGame, self.player.address)
                    self.getPlayerWithdrawEnable(self.player.address)
                  })
              })
          })
      }
    },
    // Get player contribution amount
    getPlayerContributionBalance (ethGame, playerAddress) {
      let self = this
      // Get contract
      var contract = new self.web3js.eth.Contract(this.abi, this.contractAddress)
      // Get contribution amount
      contract.methods.getContributionAmount(ethGame.id, playerAddress).call().then(
        function (amount) {
          self.player.contributionBalance = Units.convert(amount, 'wei', 'eth')
        })
    },
    //  Get player break allowance
    getPlayerBreakEnable (ethGame, currentAccount) {
      let self = this
      // Get contract
      var contract = new self.web3js.eth.Contract(self.abi, self.contractAddress)
      // Get contribution status
      contract.methods.getContributionAmount(ethGame.id, currentAccount).call().then(
        function (contributionAmount) {
          if (contributionAmount > 0) {
            self.player.breakEnable = true
          }
        })
    },
    // Get player withdraw amount
    getPlayerWithdrawEnable (playerAddress) {
      let self = this
      // Get contract
      var contract = new self.web3js.eth.Contract(this.abi, this.contractAddress)
      // Get withdraw amount
      contract.methods.pendingReturnValues(playerAddress).call().then(
        function (amount) {
          self.player.withdrawBalance = Units.convert(amount, 'wei', 'eth')
          // Check if withdraw enable
          if (amount > 0) {
            self.player.withdrawEnable = true
          }
        })
    },
    /*************
      Contribution
    *************/
    // Contribute to the piggy
    contributePiggy (minContribution) {
      let self = this

      // Get contribution
      let playerContribution = self.player.contributionValue
      // Format contribution
      playerContribution = playerContribution.replace(/,/g, '.')
      playerContribution = playerContribution.replace(/^\./g, '0.')

      // Check user contribution
      if (playerContribution === '') {
        self.contributionError = 'You must enter a valid contribution'
        return false
      } else if (playerContribution < minContribution) {
        self.contributionError = 'Your contribution beyond the limit (' + minContribution + ')'
        return false
      }

      // Dial node
      self.dialJs()

      // Contribute
      self.web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let currentAddress = accounts[0]

          // Get contract
          var contract = new self.web3js.eth.Contract(self.abi, self.contractAddress)
          // Send contribution
          contract.methods.contribute().send({value: Units.convert(playerContribution, 'eth', 'wei'), from: currentAddress})
            .on('transactionHash', function (hash) {
              console.log('as contributed', hash)

              // Alert DialogContribute.vue (self is DialogContribute.vue)
              self.contributionStatus = 'contributed'

              // Alert HomePage.vue (the event is catched by HomePage.vue)
              self.$emit('contribution', true)
            })
            .on('receipt', function (receipt) {
              console.log('receipt:', receipt)
            })
            .on('confirmation', function (confirmationNumber, receipt) {
              // console.log('confirmation:', confirmationNumber, receipt)
            })
            .on('error', function (error) {
              console.log('error:', error)
            })
        })
    },
    // Break the piggy
    breakPiggy () {
      console.log('Break!')
      let self = this
      // Dial node
      self.dialJs()
      // Get accounts
      self.web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let currentAddress = accounts[0]

          // Get contract
          var contract = new self.web3js.eth.Contract(self.abi, self.contractAddress)
          // Break piggy
          contract.methods.breakPiggy().send({from: currentAddress})
            .on('transactionHash', function (hash) {
              console.log('transactionHash:', hash)
              self.contributeStatus = 'contributed'
              // self.loading.break = true
              self.$emit('break', true)
            })
            .on('receipt', function (receipt) {
              console.log('receipt:', receipt)
            })
            .on('confirmation', function (confirmationNumber, receipt) {
              // console.log('confirmation:', confirmationNumber, receipt)
            })
            .on('error', function (error) {
              console.log('error:', error)
            })
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

          // Exec contract
          var contract = new self.web3js.eth.Contract(self.abi, self.contractAddress)
          contract.methods.withdraw(currentAddress).send({from: currentAddress})
            .on('transactionHash', function (hash) {
              console.log('transactionHash:', hash)
              // self.loading.withdraw = true
              self.$emit('withdraw', true)
            })
            .on('receipt', function (receipt) {
              console.log('receipt:', receipt)
            })
            .on('confirmation', function (confirmationNumber, receipt) {
              // console.log('confirmation:', confirmationNumber, receipt)
            })
            .on('error', function (error) {
              console.log('error:', error)
            })
        })
    },
    closeMetamaskDialog () {
      this.metamaskDialog = false
    },
    closeWaitDialog () {
      this.waitDialog = false
    }
  }
}
