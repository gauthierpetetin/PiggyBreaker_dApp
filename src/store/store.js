import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    gameStarted: false,
    authenticated: false,
    authenticateDialog: false,
    metamaskInterval: null,
    metamaskEnabled: false,
    contract: {
      address: null,
      abi: null
    },
    ethPlayer: {
      address: null,
      email: null,
      // contributionValue: null,
      contributionBalance: 0,
      withdrawBalance: 0,
      breakEnable: false,
      withdrawEnable: false
    },
    ethTransaction: {
      checked: false,
      enable: false,
      status: null
    },
    ethGame: {
      id: null,
      value: null
    },
    ethLoading: {
      contribution: false,
      break: false,
      withdraw: false
    },
    ethPendingTx: null,
    fbCurrentGame: {
      id: null,
      value: 0,
      nbContributions: 0,
      minContribution: 0,
      open: false,
      winner: null,
      createdAt: null,
      updatedAt: null,
      brokenAt: null,
      breakable: null,
      breakableAt: null,
      serverTimestamp: null
    },
    fbPreviousGame: {
      id: null,
      value: 0,
      nbContributions: 0,
      minContribution: 0,
      open: false,
      winner: null,
      createdAt: null,
      updatedAt: null,
      brokenAt: null,
      breakable: null,
      breakableAt: null,
      serverTimestamp: null
    },
    fbBiggestPiggyValue: 0,
    explorer: {
      contract: {
        mainnet: 'https://etherscan.io/address/',
        ropsten: 'https://ropsten.etherscan.io/address/'
      },
      transaction: {
        mainnet: 'https://etherscan.io/tx/',
        ropsten: 'https://ropsten.etherscan.io/tx/'
      }
    },
    gameBreakEnable: false,
    percentage: 0,
    timerBackgroundColor: 'null'
  }
})
