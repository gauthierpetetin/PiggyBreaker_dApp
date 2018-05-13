<template>
  <v-card class="member-card">
    <v-card-text>
      <v-avatar
          :tile="true"
          :size="140"
          class="grey lighten-4"
        >
          <!-- <div> -->
            <img :src="member.img" alt="avatar" style="overflow: hidden">
          <!-- </div> -->
      </v-avatar>
    </v-card-text>

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

</style>
