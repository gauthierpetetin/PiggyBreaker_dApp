import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/views/Homepage'

import Piggies from '@/views/piggies/Piggies'
import Invite from '@/views/invite/Invite'
import FAQ from '@/views/faq/FAQ'
import About from '@/views/about/About'
import TermsOfUse from '@/views/informations/TermsOfUse'
import PrivacyPolicy from '@/views/informations/PrivacyPolicy'

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
      path: '/piggies',
      name: 'Piggies',
      component: Piggies
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
    },
    {
      path: '/terms-of-use',
      name: 'terms-of-use',
      component: TermsOfUse
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicy
    }
  ]
})