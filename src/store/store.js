import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    metamaskInterval: null,
    metamaskEnabled: false,
    contract: {
      address: null,
      abi: null
    },
    loading: {
      contribution: false,
      break: false,
      withdraw: false
    }
  }
})
