import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/views/Homepage'

import Invite from '@/views/invite/Invite'
import FAQ from '@/views/faq/FAQ'
import About from '@/views/about/About'

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
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
