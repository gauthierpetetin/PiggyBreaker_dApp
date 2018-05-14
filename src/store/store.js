import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    metamaskEnabled: false,
    contract: {
      address: null,
      abi: null
    }
  }
})
