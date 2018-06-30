// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
// import VueAnalytics from 'vue-analytics'
import VueResource from 'vue-resource'
import { store } from './store/store'
import VueNativeNotification from 'vue-native-notification'
// Translate
// import VueI18n from 'vue-i18n'
import i18n from './locales'

import('../node_modules/vuetify/dist/vuetify.min.css')

export const eventBus = new Vue()

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(Vuetify)
Vue.use(VueNativeNotification, {
  // Automatic permission request before
  // showing notification (default: true)
  requestOnNotify: true
})

Vue.notification.requestPermission()
  .then(console.log('Request notification permission.'))

// Translate
// Vue.use(VueI18n)

Vue.filter('round', function (value, accuracy) {
  let factor = Math.pow(10, accuracy)
  return Math.round(parseFloat(value) * factor) / factor
})

// const lang = store.state.language
const lang = 'cn'
// const lang = 'en'
if (lang) {
  i18n.locale = lang
}

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
  i18n,
  components: { App },
  template: '<App/>'
})
