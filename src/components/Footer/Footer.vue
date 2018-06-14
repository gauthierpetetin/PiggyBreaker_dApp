<template>
  <v-footer style="background-color: #404040">
    <v-layout row wrap align-center>
      <v-flex xs1>
      </v-flex>
      <v-flex xs5>
        <div class="black--text ml-3 text-xs-right">
          <router-link class="white--text" to="terms-of-use">Terms of use</router-link>
        </div>
      </v-flex>
      <v-flex xs5>
        <div class="black--text ml-3 text-xs-left">
          <router-link class="white--text" to="privacy-policy">Privacy policy</router-link>
        </div>
      </v-flex>
      <v-flex xs1>
        <div class="black--text ml-3 text-xs-left">
          <p class="white--text" style="margin: 5px 5px;">v.0.9.1</p>
        </div>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<style scoped>

  .footer {
    background-color: orange;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100px;
    width: 100%;
    overflow:hidden;
  }

</style>
