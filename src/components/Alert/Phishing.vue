<template>
  <v-alert v-model="alert" type="info" dismissible style=" padding-top: 5px; padding-bottom: 10px">
    IMPORTANT! Please check you're on the right url: https://piggybreaker.com/
    <img src="/static/img/icon/arrow_top.png" height="20" style="margin-left: 15px">
  </v-alert>
</template>

<script>
export default {
  data () {
    return {
      alert: true
      // background-color: #E91E63 !important;//pink
    }
  }
}
</script>
