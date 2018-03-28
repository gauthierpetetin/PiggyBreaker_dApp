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
        <v-layout row wrap align-top
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
                  <v-container grid-list-md>
                    <v-layout wrap>

                      <v-flex xs12 sm6>
                        Your ETH contribution*<br />
                        (minimum contribution: 0.01ETH)
                      </v-flex>
                      <v-flex xs12 sm2>
                        <v-select

                          :items="[50, 40, 30, 20, 10]"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm12>
                        *Your	chances	to	win	the	lottery	are	directly	proportional to	the	amount	your	contribution(s)
                      </v-flex>
                      <v-flex xs12 sm12>
                        <v-btn block color="warning" dark @click.native="contribute()">Contribute</v-btn>
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
            <div class="remaining-time"><countdown date="2018-03-27 23:00:00"></countdown></div>
          </v-flex>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-layout
        column
        wrap
        class="my-5"
        align-center
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
                  <v-card-text class="text-xs-center">
                    <img src="/static/img/picto/1-contribute.png" height="200">
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">1. You <strong>contribute</strong> with	Ethers</div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <img src="/static/img/picto/2-break-piggy.png" height="200">
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">2. <strong>Any contributor</strong> can decide to break the Piggy</div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <img src="/static/img/picto/3-random-winner.png" height="200">
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">3. A winner is <strong>chosen randomly</strong> between the contributors**</div>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

    <section>
      <v-parallax  class="parallax-background" height="280">
        <v-layout column align-center justify-center>
          <div class="headline black--text mb-3 text-xs-center">**Your chances to win the lottery are directly proportional to the amount your contribution(s)</div>

        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-5">
          <v-flex sm12 class="my-3">
            <div class="text-xs-center">
              <h2 class=" display-1">Examples</h2>
            </div>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card class="elevation-0 transparent">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs4>
                    <v-card-media
                      src="/static/img/picto/big-piggy.png"
                      height="125px"
                      contain
                    ></v-card-media>
                  </v-flex>
                  <v-flex xs8>
                    <v-list class="transparent">
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Piggy value: 40 ETH</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Your contribution: 20 ETH</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Your chances to win the lottery: 50%</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card class="elevation-0 transparent">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs4>
                    <v-card-media
                      src="/static/img/picto/big-piggy.png"
                      height="125px"
                      contain
                    ></v-card-media>
                  </v-flex>
                  <v-flex xs8>
                    <v-list class="transparent">
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Piggy value: 40 ETH</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Your contribution: 0.4 ETH</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Your chances to win the lottery: 1%</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </div>
</template>



<script>
import Countdown from '@/components/Countdown/Countdown.vue'

import Web3  from 'web3'
// import Tx from 'ethereumjs-tx'
import Units from 'ethereumjs-units'



let contractAbi = `[
	{
		"constant": false,
		"inputs": [],
		"name": "breakPiggy",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "newContract",
				"type": "address"
			}
		],
		"name": "ContractUpgrade",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "Unpause",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "Pause",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_piggyID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_rateCurrent",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "rateNext",
				"type": "uint256"
			}
		],
		"name": "UpdateRate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_piggyID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_winner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "PiggyBroken",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_piggyID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_player",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "NewPiggyContribution",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_piggyID",
				"type": "uint256"
			}
		],
		"name": "PiggyCreated",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "contribute",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "forgottenFundsRecovery",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "pause",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_v2Address",
				"type": "address"
			}
		],
		"name": "setNewAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newPercentage",
				"type": "uint256"
			}
		],
		"name": "setPercentage",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newUpdatePeriod",
				"type": "uint256"
			}
		],
		"name": "setUpdatePeriod",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newFarmer",
				"type": "address"
			}
		],
		"name": "transferFarmOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_nbPiggies",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "unpause",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_withDrawalAddress",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "farmer",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "lastContributionFrequency",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "lastUpdateDate",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "localContributionsCounter",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "nbPiggies",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "newContractAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "pendingReturnDates",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "pendingReturnValues",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "percentage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "piggies",
		"outputs": [
			{
				"name": "piggyID",
				"type": "uint256"
			},
			{
				"name": "value",
				"type": "uint256"
			},
			{
				"name": "open",
				"type": "bool"
			},
			{
				"name": "creationTime",
				"type": "uint256"
			},
			{
				"name": "lastContributionTime",
				"type": "uint256"
			},
			{
				"name": "winner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "rateCurrent",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "rateLimit",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "rateNext",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "updatePeriod",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]`
let contractBytecode = '0x6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a7230582030036eed4617b76ee4550080d2fced7bfbc3ddba9d7b7212901e539bd92c6f5a0029'

// let web3 = new Web3()




export default {
  data () {
    return {
      dialog: false,
      balance: 0,
      contractAddress: '0xdd69ba97454829f6010b67b0340f0d8d3f439225',
      nodeUrl: 'https://ropsten.infura.io/78ug1ovJZrudvaEsb3UV'
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
      // Get provider
      // web3.setProvider(this.nodeUrl)
      //
      // console.log('Connected to node')
      //
      // this.getBalance(this.contractAddress)
    },
    getBalance (address) {
      console.log('Get contract value')

      // Get balance
      let self = this
      web3.eth.getBalance(address)
      .then(function (balance){
        console.log('Get balance: ' + balance)
        balance =  Units.convert(balance, 'wei', 'eth')
        self.balance = balance
      })
    },
    contribute () {
      console.log('Contribute')
      // let web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
      console.log("existing web3: provider ", typeof web3, web3.currentProvider)

      var abi = JSON.parse(contractAbi)
      // Exec contract
      var contract = new web3.eth.Contract(abi, '0xfc6d6f4eedb15056214b32a3885e1869a9af543d')
      contract.methods.lastUpdateDate().call()
      .then(console.log);

      console.log('Contract: ', contract);

      contract.methods.contribute().send({value: Units.convert(0.3, 'eth', 'wei'), from: '0xB8C27bB42146E7d81CD1F81337a089aa066884fe'})

      /*
      web3 = new Web3(web3.currentProvider)

      var abi = JSON.parse(contractAbi)
      // Exec contract
      var contract = new web3.eth.Contract(abi, this.contractAddress)
      console.log('Contract: ', contract);

      // Save current this
      let self = this
      self.executing = true

      // Estimate gas price
      web3.eth.getGasPrice(function(gasPriceError, result) {
        if (gasPriceError) {
          console.log('Get GasPrice error: ', gasPriceError)
          self.executing = false
          return
        } else{
          var gasPrice = result;
          console.log('Get GasPrice success: ', gasPrice)
          var gasPriceHex = web3.utils.numberToHex(gasPrice)

          // Get nonce
          web3.eth.getTransactionCount(self.address, function(nonceError, nonce) {
            if (nonceError) {
              console.log("Nonce error : ", nonceError)
              self.executing = false
              return
            }
            else {
              // Get the current nonce
              const nonceHex = web3.utils.numberToHex(nonce)
              console.log("Nonce hex : ", nonce)

              // Execute the smart contract method
              var newValue = parseInt(self.storageValue)
              var contractCallData = contract.methods.set(newValue)
              console.log('contractCallData : ', contractCallData)

              // Get payload
              var payload = contractCallData.encodeABI()

              // Set the gas limit
              const gasLimitHex = web3.utils.numberToHex(300000)

            }
          })
        }
      })
      */
    },
    breakPiggy () {
      console.log('Break')
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
