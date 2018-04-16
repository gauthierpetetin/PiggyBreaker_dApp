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
              <v-text-field type="text" email
                style="width:300px;"
                label="Email"
                :rules="emailRules"
                v-model="email"
                @focus="$event.target.select()"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12>
              <v-btn
                block
                dark
                :class="[emailValid ? 'primary' : 'grey']"
                @click.native="invite()"
                >Invite friend per email</v-btn>
              <v-dialog v-model="dialogConfirm" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span></span>
                    <v-spacer>{{ dialogMessage }}</v-spacer>
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
      apiUrl: process.env.API_URL,
      emailValid: false,
      email: null,
      emailRules: [
        v => {
          return !!v || 'E-mail is required'
        },
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      dialogConfirm: null,
      dialogMessage: null
    }
  },
  watch: {
    email: function (val) {
      if (this.validEmail(val)) {
        this.emailValid = true
      } else {
        this.emailValid = false
      }
    }
  },
  methods: {
    invite () {
      if (!this.emailValid) {
        return false
      }

      let data = {
        email: this.email
      }

      let self = this
      this.$http.post(this.apiUrl, JSON.stringify(data))
        .then(function (response) {
          self.dialogConfirm = !self.dialogConfirm
          // success
          if (response.body.status === 'success') {
            self.dialogMessage = 'An email have been sent to your friend!'
          } else if (response.body.status === 'error') {
            self.dialogMessage = 'An invitation have already been sent.'
          }
        }, function (response) {
          self.dialogConfirm = !self.dialogConfirm
          // error
          console.log('error', response.body.status)
          self.dialogMessage = 'An error happened, please retry later.'
        })
    },
    validEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
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
  padding: 20px;
}

</style>
