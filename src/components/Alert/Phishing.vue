<template>
  <v-alert v-model="alert" type="info" dismissible>
    DON'T GET PHISHED, please! Thank you!
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
