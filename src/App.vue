<template>
  <div id="app">
    <v-app v-cloak light>
      <v-content>
        <app-alert-phishing></app-alert-phishing>
        <app-header></app-header>
        <router-view/>
        <app-discord></app-discord>
        <app-footer></app-footer>
      </v-content>
    </v-app>
  </div>
</template>

<script>

import AlertPhishing from './components/Alert/Phishing.vue'
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
import Discord from './components/Discord/Discord.vue'

export default {
  name: 'App',
  components: {
    appAlertPhishing: AlertPhishing,
    appHeader: Header,
    appFooter: Footer,
    appDiscord: Discord
  }
}
</script>

<style>
  [v-cloak] {
    display: none;
  }

  @font-face {
    font-family: gothamRounded;
    src: url('./assets/fonts/gotham-rounded/GothamRounded-Medium.otf');
  }

  #app {
    font-family: gothamRounded;
  }

</style>
