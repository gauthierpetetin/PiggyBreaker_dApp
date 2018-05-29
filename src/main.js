// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
// import VueAnalytics from 'vue-analytics'
import VueResource from 'vue-resource'
import { store } from './store/store'

import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(Vuetify)
// Vue.use(VueAnalytics, {
//   id: 'UA-117489719-1',
//   router
// })

Vue.filter('round', function (value, accuracy) {
  let factor = Math.pow(10, accuracy)
  return Math.round(parseFloat(value) * factor) / factor
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // filters: {
  //   round(value, accuracy) {
  //     let factor = Math.pow(10, accuracy)
  //     return Math.round(parseFloat(value) * factor) / factor
  //   }
  // },
  router,
  store,
  components: { App },
  template: '<App/>'
})
