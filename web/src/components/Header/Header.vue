<template>
  <v-toolbar class="white">
    <v-toolbar-title>
      <router-link to="/" ><a class="nav-link"><img src="@/assets/logo/logo-crypto-piggy.png" height="50"></a></router-link>
    </v-toolbar-title>
    <v-toolbar-items v-if="networkStatus == 'good'">
      <v-tooltip bottom>
        <v-btn flat slot="activator" class="metamask-status"><img src="/static/img/icon/circle-green.png"> Network good</v-btn>
        <span>Network is good</span>
      </v-tooltip>
    </v-toolbar-items>
    <v-toolbar-items v-else-if="networkStatus == 'bad'">
      <v-tooltip bottom>
        <v-btn flat slot="activator" class="metamask-status"><img src="/static/img/icon/circle-red.png"> Network bad</v-btn>
        <span>No web3? You should consider trying MetaMask!</span>
      </v-tooltip>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn to="invite" flat>Invite</v-btn>
      <v-btn to="piggies" flat>Last Piggies</v-btn>
      <v-btn to="about" flat>About</v-btn>
      <v-btn to="faq" flat>FAQ</v-btn>
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
      networkStatus: 'bad'
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
        console.log('No web3? You should consider trying MetaMask!')
      }
    }
  }
}
</script>

<style scoped>

.metamask-status {
  margin: 15px 0 0 0;
  padding-left: 50px;
}

.metamask-status img {
  margin: 0 5px 2px 0;
}

</style>
