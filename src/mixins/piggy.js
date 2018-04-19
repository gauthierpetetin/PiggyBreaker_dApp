
import Web3 from 'web3'
import Units from 'ethereumjs-units'

let contractAbi = `[{"constant":false,"inputs":[],"name":"breakPiggy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pendingReturnValues","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rateNext","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"localContributionsCounter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"piggyProtectionLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newFarmer","type":"address"}],"name":"transferFarmOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastContributionFrequency","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pendingReturnDates","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"piggyProtectionTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_withDrawalAddress","type":"address"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_piggyID","type":"uint256"},{"name":"_player","type":"address"}],"name":"getContributionAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newPercentage","type":"uint256"}],"name":"setPercentage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_piggyProtectionLimit","type":"uint256"}],"name":"setPiggyProtectionLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rateLimit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newContractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_v2Address","type":"address"}],"name":"setNewAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nbPiggies","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rateCurrent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"updatePeriod","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"piggies","outputs":[{"name":"piggyID","type":"uint256"},{"name":"value","type":"uint256"},{"name":"open","type":"bool"},{"name":"creationTime","type":"uint256"},{"name":"lastContributionTime","type":"uint256"},{"name":"brokenTime","type":"uint256"},{"name":"winner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"forgottenFundsRecovery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newRateLimit","type":"uint256"}],"name":"setRateLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"percentage","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_piggyProtectionTime","type":"uint256"}],"name":"setPiggyProtectionTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"contribute","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"farmer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newUpdatePeriod","type":"uint256"}],"name":"setUpdatePeriod","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_nbPiggies","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"}],"name":"PiggyCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_player","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"NewPiggyContribution","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_winner","type":"address"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"PiggyBroken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_piggyID","type":"uint256"},{"indexed":false,"name":"_rateCurrent","type":"uint256"},{"indexed":false,"name":"rateNext","type":"uint256"}],"name":"UpdateRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_player","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Withdrawal","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newContract","type":"address"}],"name":"ContractUpgrade","type":"event"}]`

// var abi =
export default {
  data () {
    return {
      // Contract
      abi: JSON.parse(contractAbi),
      contractAddress: process.env.ETHEREUM_CONTRACT,
      // Ws
      nodeUrl: process.env.ETHEREUM_NODE_URL,
      web3ws: new Web3(),
      // Metamask
      web3js: window.web3,
      // Elements
      piggies: [],
      piggy: {
        id: null,
        value: null,
        minContribution: null,
        lastContributionTime: null,
        nextContributionTime: null,
        breakTimerEnable: false
      },
      player: {
        currentContribution: null,
        contributionBalance: 0,
        withdrawBalance: 0,
        breakEnable: false,
        withdrawEnable: false
      },

      // UI
      timeLimit: 180,
      lockStatus: null,
      contributionEnable: false,
      // breakEnable: false,
      // withdrawEnable: false,
      contributionLoadingStatus: false,
      breakLoadingStatus: false,
      withdrawLoadingStatus: false
    }
  },
  methods: {
    /*************
      WS
    *************/
    // Dial node
    dialWs () {
      // Get provider
      this.web3ws.setProvider(this.nodeUrl)
    },
    // Get last piggy
    getCurrentWSPiggy () {
      let self = this

      // Disable loading
      self.contributionLoadingStatus = false
      self.breakLoadingStatus = false
      self.withdrawLoadingStatus = false
      // Dial node
      self.dialWs()
      // Get contract
      var contract = new this.web3ws.eth.Contract(this.abi, this.contractAddress)
      // Exec contract
      contract.methods.nbPiggies().call().then(
        function (nbPiggies) {
          self.retreivedValue = nbPiggies
          contract.methods.piggies(nbPiggies).call().then(
            function (piggy) {
              // Set piggy value
              self.piggy.value = Units.convert(piggy.value, 'wei', 'eth')
              // Get min contribution
              self.getPiggyMinimumContribution()
            })
        })
    },
    // Get piggy minimum contribution
    getPiggyMinimumContribution () {
      let self = this

      // Get contract
      var contract = new this.web3ws.eth.Contract(this.abi, this.contractAddress)
      // Get rate limit
      contract.methods.rateLimit().call().then(
        function (rateLimit) {
          rateLimit = Units.convert(rateLimit, 'wei', 'eth')
          contract.methods.rateCurrent().call().then(
            function (rateCurrent) {
              rateCurrent = Units.convert(rateCurrent, 'wei', 'eth')
              contract.methods.rateNext().call().then(
                function (rateNext) {
                  rateNext = Units.convert(rateNext, 'wei', 'eth')
                  let minContribution = 0

                  // Check next
                  if (rateNext > rateCurrent) {
                    minContribution = rateNext
                  } else {
                    minContribution = rateCurrent
                  }

                  // Check limit
                  if (minContribution < rateLimit) {
                    minContribution = rateLimit
                  }

                  self.piggy.minContribution = minContribution
                })
            })
        })
    },
    // Get piggies list
    getPiggiesList () {
      let self = this

      // Get contract
      var contract = new this.web3ws.eth.Contract(this.abi, this.contractAddress)
      // Get piggies list
      contract.methods.nbPiggies().call().then(
        function (nbPiggies) {
          self.retreivedValue = nbPiggies

          for (let i = nbPiggies; i >= 1; i--) {
            contract.methods.piggies(i).call().then(
              function (piggyItem) {
                console.log('Get contract value', piggyItem)
                let createdAt = new Date(piggyItem.creationTime * 1000)
                var piggy = {
                  id: piggyItem.piggyID,
                  value: Units.convert(piggyItem.value, 'wei', 'eth'),
                  open: piggyItem.open,
                  createdAt: createdAt,
                  winner: piggyItem.winner
                  // contributions: piggyItem.contributions
                }
                // self.piggies.push(piggy)
                self.piggies.splice(nbPiggies - piggyItem.piggyID, 0, piggy)
                console.log(piggy)
              }
            )
          }
        })
    },
    // Catch events
    catchEvents () {
      let self = this

      console.log('Start catching events')

      // Dial node
      self.dialWs()

      var contractWs = new this.web3ws.eth.Contract(this.abi, this.contractAddress)

      // New piggy contribution
      contractWs.events.NewPiggyContribution({},
        { fromBlock: 'latest' },
        function (error, nbPiggies, sender, value) {
          if (error) {
            console.log(error.stack)
          }
          console.log('Catch NewPiggyContribution:', nbPiggies, sender, value)
          // Refresh piggy info
          self.getCurrentWSPiggy()
          // Refresh player data
          self.getPlayerData()
        })

      // Piggy created
      contractWs.events.PiggyCreated({},
        { fromBlock: 'latest' },
        function (error, piggyID) {
          if (error) {
            console.log(error.stack)
          }
          console.log('Catch PiggyCreated:', piggyID)
          // Refresh piggy info
          self.getCurrentWSPiggy()
          // Refresh player data
          self.getPlayerData()
        })

      // Player withdrawal
      contractWs.events.Withdrawal({},
        { fromBlock: 'latest' },
        function (error, value) {
          if (error) {
            console.log(error.stack)
          }
          console.log('withdrawal:', value)
          // Refresh player data
          self.getPlayerData()
        })
    },
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
    // Check Metamask
    checkMetasmask () {
      let self = this

      // Dial node
      self.dialJs()

      // Check if installed
      if (!self.web3js.currentProvider.isMetaMask) {
        self.contributionEnable = false
        self.lockStatus = 'not_installed'
      }

      // Get accounts
      self.web3js.eth.getAccounts()
        .then(function (accounts) {
          if (accounts.length === 0) {
            self.contributionEnable = false
            self.lockStatus = 'locked'
          } else {
            // Check if on good network
            self.web3js.eth.net.getId().then(
              function (netId) {
                if (netId === 1) {
                  if (process.env.ETHEREUM_NODE_ENV === 'development') {
                    self.contributionEnable = false
                    self.lockStatus = 'wrong_network'
                  } else {
                    self.contributionEnable = true
                    // Get Player data
                    self.getPlayerData()
                  }
                } else if (netId === 3) {
                  if (process.env.ETHEREUM_NODE_ENV === 'production') {
                    self.contributionEnable = false
                    self.lockStatus = 'wrong_network'
                  } else {
                    self.contributionEnable = true
                    // Get Player data
                    self.getPlayerData()
                  }
                }
              })
          }
        })
    },
    // Get all player data
    getPlayerData () {
      let self = this
      // self.breakLoadingStatus = false
      self.withdrawLoadingStatus = false

      // Get contract
      var contract = new self.web3js.eth.Contract(this.abi, this.contractAddress)
      // Get current Piggy
      contract.methods.nbPiggies().call().then(
        function (piggyId) {
          contract.methods.piggies(piggyId).call().then(
            function (piggy) {
              // Set piggy id
              self.piggy.id = piggy.piggyID
              // Set piggy value
              self.piggy.value = Units.convert(piggy.value, 'wei', 'eth')
              // Set
              self.piggy.lastContributionTime = piggy.lastContributionTime
              // Get accounts
              self.web3js.eth.getAccounts()
                .then(function (accounts) {
                  console.log(accounts)
                  let currentAccount = accounts[0]
                  // Get player data
                  self.getPlayerContributionBalance(self.piggy, currentAccount)
                  self.getPlayerWithdrawBalance(currentAccount)
                  self.getPlayerBreakAllowance(self.piggy, currentAccount)
                })
            })
        })
    },
    // Get player contribution amount
    getPlayerContributionBalance (piggy, currentAccount) {
      let self = this

      // Get contract
      var contract = new self.web3js.eth.Contract(this.abi, this.contractAddress)
      // Get contribution amount
      contract.methods.getContributionAmount(piggy.id, currentAccount).call().then(
        function (amount) {
          self.player.contributionBalance = Units.convert(amount, 'wei', 'eth')
        })
    },
    // Get player withdraw amount
    getPlayerWithdrawBalance (currentAccount) {
      let self = this

      // Get contract
      var contract = new self.web3js.eth.Contract(this.abi, this.contractAddress)
      // Get withdraw amount
      contract.methods.pendingReturnValues(currentAccount).call().then(
        function (amount) {
          console.log('Withdraw amount: ' + amount)
          self.player.withdrawBalance = Units.convert(amount, 'wei', 'eth')
          // Check if withdraw enable
          if (amount > 0) {
            self.player.withdrawEnable = true
          }
        })
    },
    //  Get player break allowance
    getPlayerBreakAllowance (piggy, currentAccount) {
      console.log('Check break')
      let self = this
      // Get contract
      var contract = new self.web3js.eth.Contract(self.abi, self.contractAddress)
      // Get contribution status
      contract.methods.getContributionAmount(piggy.id, currentAccount).call().then(
        function (contributionAmount) {
          if (contributionAmount > 0) {
            // Get time limit
            self.piggy.nextContributionTime = new Date(piggy.lastContributionTime * 1000 + (self.timeLimit * 1000))
            // Get current time
            var currentTime = new Date()
            if ((currentTime.getTime() > self.piggy.nextContributionTime.getTime())) {
              console.log('Break true')
              self.player.breakEnable = true
              self.piggy.breakTimerEnable = false
            } else {
              console.log('Break false time')
              self.player.breakEnable = false
              self.piggy.breakTimerEnable = true
            }
          } else {
            console.log('Not contribution', piggy.id)
            self.player.breakEnable = false
            self.piggy.breakTimerEnable = false
          }
          console.log(self.piggy.nextContributionTime)
        })
    },
    /*************
      Contribution
    *************/
    // Contribute to the piggy
    contributePiggy () {
      let self = this

      // Get contribution
      let playerContribution = self.player.currentContribution
      // Format contribution
      playerContribution = playerContribution.replace(/,/g, '.')
      playerContribution = playerContribution.replace(/^\./g, '0.')

      // Check user contribution
      if (playerContribution === '') {
        self.contributionError = 'You must enter a valid contribution'
        return false
      } else if (playerContribution < self.piggy.minContribution) {
        self.contributionError = 'Your contribution is under the limit (' + self.piggy.minContribution + ')'
        return false
      }

      // Dial node
      self.dialJs()

      // Contribute
      self.web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let defaultAccount = accounts[0]

          // Get contract
          var contract = new self.web3js.eth.Contract(self.abi, self.contractAddress)
          // Send contribution
          contract.methods.contribute().send({value: Units.convert(playerContribution, 'eth', 'wei'), from: defaultAccount})
            .on('transactionHash', function (hash) {
              console.log('as contributed', hash)
              self.contributionStatus = 'contributed'

              // Send to parent
              self.$emit('contribution', true)
            })
            .on('receipt', function (receipt) {
              console.log('receipt:', receipt)
              // self.getCurrentWSPiggy()
              // self.getPlayerData()
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
      let self = this

      self.web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let currenttAccount = accounts[0]

          // Get contract
          var contract = new self.web3js.eth.Contract(self.abi, self.contractAddress)
          // Break piggy
          contract.methods.breakPiggy().send({from: currenttAccount})
            .on('transactionHash', function (hash) {
              console.log('transactionHash:', hash)
              self.contributeStatus = 'contributed'
              self.breakLoadingStatus = true
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
      let self = this

      self.web3js.eth.getAccounts()
        .then(function (accounts) {
          console.log(accounts)
          let defaultAccount = accounts[0]

          // Exec contract
          var contract = new self.web3js.eth.Contract(self.abi, self.contractAddress)
          contract.methods.withdraw(defaultAccount).send({from: defaultAccount})
            .on('transactionHash', function (hash) {
              console.log('transactionHash:', hash)
              self.withdrawLoadingStatus = true
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
    }
  }

}
