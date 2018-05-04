// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
