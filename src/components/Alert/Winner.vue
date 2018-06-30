<template>
  <v-alert v-model="winnerAlert" type="info" dismissible style="padding-top: 10px; padding-bottom: 10px">
    <span v-html="$t('lang.alert.luckGuy')"></span>
    <!-- <img src="/static/img/icon/arrow_bottom.png" height="20" style="margin-left: 15px;"> -->
  </v-alert>
</template>

<script>
export default {
  data () {
    return {
      winnerAlert: false
    }
  },
  watch: {
    '$store.state.ethPlayer.withdrawBalance': function (val) {
      let etherBalance = this.$store.state.ethPlayer.withdrawBalance
      if (etherBalance > 0) {
        this.winnerAlert = true
      } else {
        this.winnerAlert = false
      }
    }
  }
}
</script>
