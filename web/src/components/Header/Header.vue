<template>
  <v-toolbar class="white">
    <v-toolbar-title>
      <router-link to="/" ><a class="nav-link"><img src="@/assets/logo/logo-crypto-piggy.png" height="40"></a></router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn to="invite" flat>Invite</v-btn>
      <v-btn to="about" flat>About</v-btn>
      <v-btn to="faq" flat>FAQ</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {

}
</script>

<style scoped>
</style>
