import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/views/Homepage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/invite',
      name: 'Invite',
      component: Invite
    },
  ]
})
