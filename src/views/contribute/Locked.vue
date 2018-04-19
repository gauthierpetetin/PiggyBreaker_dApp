<template>
    <v-layout row wrap
    class="white--text">
      <v-container v-if="lockstatus == 'not_installed'" grid-list-xl>
        <v-flex md12 class="text-xs-center black--text" style="font-size:28px">
          <h2 class=" display-2">Wanna play?</h2>
          <br />
          You’ll need a place to store your ether (ETH) in a secure wallet like Metamask. This will also act as your login to the game (no extra password needed).
        </v-flex>
        <v-flex md12 class="text-xs-center black--text" style="font-size:28px">
          <v-btn
            class="mt-3"
            style="background-color: #FF00FF;"
            dark
            large
          >
            Install Metamask
          </v-btn>
        </v-flex>
        <v-flex md12 class="text-xs-center black--text">
          <!-- Getting Started -->
          <app-getting-started></app-getting-started>
          <!-- /Getting Started -->
        </v-flex>
      </v-container>
      <v-container v-if="lockstatus == 'locked'" grid-list-xl>
        <v-flex md12 class="text-xs-center black--text" style="font-size:28px">
          <h2 class=" display-2">Your metamask is locked</h2>
          <br />
          Simply open MetaMask and follow the instruction to unlock it.
        </v-flex>

        <v-flex md12 class="text-xs-center">
        <img src="/static/img/picto/piggy-bank-cage.jpg" alt="piggy locked">
        </v-flex>
        <v-flex md12 class="text-xs-center black--text">
          <!-- Getting Started -->
          <app-getting-started></app-getting-started>
          <!-- /Getting Started -->
        </v-flex>
      </v-container>
      <v-container v-if="lockstatus == 'wrong_network'" grid-list-xl>
        <v-flex md12 class="text-xs-center black--text" style="font-size:28px">
          <h2 class=" display-2">Your metamask is not on the good network</h2>
          <br />
          Simply open MetaMask and change your network.
        </v-flex>

        <v-flex md12 class="text-xs-center">
        <img src="/static/img/picto/piggy-lost.png" alt="piggy locked" width="200">
        </v-flex>
        <v-flex md12 class="text-xs-center black--text">
          <!-- Getting Started -->
          <app-getting-started></app-getting-started>
          <!-- /Getting Started -->
        </v-flex>
      </v-container>

    </v-layout>

</template>

<script>

import GettingStarted from '@/views/faq/GettingStarted'

export default {
  props: {
    lockstatus: null
  },
  components: {
    appGettingStarted: GettingStarted
  }
}

</script>
