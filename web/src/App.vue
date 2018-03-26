<template>
  <div id="app">
    <v-app light>
      <app-header></app-header>
      <v-content>
        <router-view/>
      </v-content>
    </v-app>
  </div>
</template>

<script>

import Header from './components/Header/Header.vue'

export default {
  name: 'App',
  components: {
    appHeader: Header
  }
}
</script>

<style>
.container {
  max-width:1200px !important;
}
</style>
