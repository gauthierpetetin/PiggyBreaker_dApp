<template>
  <v-alert v-model="alert" type="info" dismissible>
    IMPORTANT! DON'T GET PHISHED, please check that you are visiting the right url https://piggybreaker.com/
  </v-alert>
</template>

<script>
export default {
  data () {
    return {
      alert: true
    }
  }
}
</script>
