<template>
  <v-toolbar style="background-color: #ffffff">
    <v-toolbar-title style="min-width: 250px">
      <router-link to="/"  class="logo">
        <a class="nav-link" >
          <img src="/static/img/logo/logo-crypto-piggy.png" height="50">
          <span style="color: #2196f3">Piggy Breaker</span>
        </a></router-link>
    </v-toolbar-title>
    <v-toolbar-items v-if="networkStatus == 'good'">
      <v-tooltip bottom>
        <v-btn flat slot="activator" class="metamask-status grey-text"><img src="/static/img/icon/circle-green.png"> Network good</v-btn>
        <span>Network is good</span>
      </v-tooltip>
    </v-toolbar-items>
    <v-toolbar-items v-else-if="networkStatus == 'bad'">
      <v-tooltip bottom>
        <v-btn flat slot="activator" class="metamask-status"><img src="/static/img/icon/circle-red.png"> Network bad</v-btn>
        <span>No web3? You should consider trying Metamask!</span>
      </v-tooltip>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <template v-if="ethereumEnv == 'development'">
      <v-toolbar-items>
        <div class="white--text" style="background-color: #F08080;margin:15px;padding: 5px 10px;">Beta version (Ropsten)</div>
      </v-toolbar-items>
      <v-spacer></v-spacer>
    </template>
    <v-toolbar-items>
      <v-btn class="grey-text" to="invite" flat>Invite</v-btn>
      <v-btn class="grey-text" to="piggies" flat>History</v-btn>
      <v-btn class="grey-text" to="about" flat>About</v-btn>
      <v-btn class="grey-text" to="faq" flat>FAQ</v-btn>
      <v-btn class="grey-text" to="settings" flat>Settings</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

// import Web3 from 'web3'

// var web3js = window.web3
// web3js = new Web3(web3js.currentProvider)

export default {
  data () {
    return {
      networkStatus: 'bad',
      ethereumEnv: process.env.ETHEREUM_NODE_ENV
    }
  },
  computed: {
    metamaskEnabled () {
      return this.$store.state.metamaskEnabled
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      if (typeof web3 !== 'undefined') {
        this.networkStatus = 'good'
      } else {
        console.log('Please install / unlock Metamask first. See below for more details.')
      }
    }
  }
}
</script>

<style scoped>

.logo  {
  text-decoration: none;
}

.logo img {
  vertical-align:middle;
}

.metamask-status {
  margin: 15px 0 0 0;
  padding-left: 50px;
}

.metamask-status img {
  margin: 0 5px 2px 0;
}

</style>
