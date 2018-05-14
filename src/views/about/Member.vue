<template>
  <v-card class="member-card">
    <v-card-media>
      <div class="grey lighten-4 member-content">
        <img :src="member.img" alt="avatar" class="member-image">
      </div>
    </v-card-media>

    <v-card-title>
      <div>
        <span class="orange--text"><strong>{{ member.name }}</strong></span><br>
        <span>{{ member.role }}</span><br>
      </div>
    </v-card-title>

  </v-card>
</template>

<script>

export default {
  props: {
    member: null
  }
}

</script>

<style scoped>

.member-card {
  min-height: 270px !important;
}

.member-content {
  margin: 15px 15px 0 15px
}

.member-image {
  overflow: hidden;width: 100%;height: auto;
}

</style>
