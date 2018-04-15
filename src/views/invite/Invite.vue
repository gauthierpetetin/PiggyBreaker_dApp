<template>
  <div>

    <section>
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <v-flex md12 >
          <img src="/static/img/picto/piggy-buddy.png" alt="avatar" width="200">
        </v-flex>

      </v-layout>
    </section>

    <section>
      <v-parallax class="parallax-background">
        <v-layout column align-center justify-center>
          <div class="headline black--text mb-3 text-xs-center">
            <v-flex xs12 sm12>
              <h2 class=" display-2">Invite your  friends to play Piggy Breaker!</h2>
            </v-flex>
          </div>
        </v-layout>
        <v-layout column align-center justify-center>
          <div class="headline black--text mb-3 text-xs-center email-form">
            <v-flex xs12 sm12>
              <v-text-field type="text" email style="width:300px;"
                label="Email"
                v-model="email"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12>
              <v-btn block color="primary" dark @click.native="invite()">Invite friend per email</v-btn>
              <v-dialog v-model="dialogConfirm" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span>An email have been sent to your friend!</span>
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn color="primary" flat @click.stop="dialogConfirm=false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
          </div>
        </v-layout>
      </v-parallax>
    </section>

  </div>
</template>

<script>

export default {
  data () {
    return {
      email: null,
      dialogConfirm: null
    }
  },
  methods: {
    invite () {
      console.log('invite')
      this.dialogConfirm = !this.dialogConfirm
      // this.inviteStatus = true
    }
  }
}

</script>

<style scoped>

.parallax-background {
  background-image: url("/static/img/background/background-piggies.jpg");
  background-repeat: repeat;
  background-size: 426px 201px;
}

.contribute-button {
  font-size: 42px;
}

.email-form {
  background-color: #f2f2f2;
  border-radius: 25px;
  /* border: 1px solid #73AD21; */
  padding: 20px;
}

</style>
