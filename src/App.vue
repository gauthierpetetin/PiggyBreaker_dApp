<template>
  <div id="app">
    <v-app v-cloak light>

      <v-content>
        <app-header></app-header>
        <router-view/>
        <app-footer></app-footer>
      </v-content>
    </v-app>
  </div>
</template>

<script>

import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'

export default {
  name: 'App',
  components: {
    appHeader: Header,
    appFooter: Footer
  }
}
</script>

<style>
  [v-cloak] {
    display: none;
  }
</style>
