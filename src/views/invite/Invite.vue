<template>
  <div>
    <section>
      <v-layout column wrap align-center style="background-color: white; padding-top: 40px; padding-bottom: 40px">
        <v-flex md12>
          <img src="/static/img/picto/PIGGY_Friends_512.png" alt="avatar" width="400">
        </v-flex>
      </v-layout>
    </section>

    <section>
      <v-parallax class="parallax-background" height="550">
        <v-layout column align-center justify-center style="padding-bottom: 25px;">
          <div style="width: 80%; height: 400px; padding: 2% 2%; background-color: white">
            <v-flex class="my-3">
              <div class="text-xs-center">
                <h4 class="display-1 blue--text small-text" style="padding: 1% 0">{{ $t('lang.invite.inviteYourFriendToPlay') }}</h4>
              </div>
            </v-flex>
            <v-flex class="my-3">
              <div class="text-xs-center grey--text title">
                <p v-html="$t('lang.invite.doYouEnjoyPiggyBreaker')">
                </p>
              </div>
            </v-flex>

            <v-flex column align-center justify-center class="my-3">
              <v-card class="elevation-0 transparent" style="margin: auto; width: 60%; margin-top: 30px;">

                <v-flex xs12 sm12 style="padding: 2% 0">
                  <v-text-field type="text" email
                  :label="$t('lang.invite.yourFriendsEmail')"
                  :rules="emailRules"
                  v-model="email"
                  @focus="$event.target.select()"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm12>
                  <v-btn block dark :class="[emailValid ? 'blue' : 'grey']" @click.native="invite()">{{ $t('lang.invite.inviteYourFriendByEmail') }}</v-btn>
                  <v-dialog v-model="dialogConfirm" max-width="500px">
                    <v-card>
                      <v-card-title>
                        <v-spacer>
                          {{ dialogMessage }}
                        </v-spacer>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn color="primary" flat @click.stop="dialogConfirm=false">
                          {{ $t('lang.invite.close') }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-flex>

              </v-card>
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
          return !!v || this.$t('lang.form.error.emailIsRequired')
        },
        v => this.validEmail(v) || this.$t('lang.form.error.emailMustBeValid')
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
      console.log('this.apiUrl', this.apiUrl)

      if (!this.emailValid) {
        return false
      }

      let data = {
        email: this.email
      }
      console.log('Invite: ', this.email)

      let self = this
      this.$http.post(this.apiUrl + '/user/invite', JSON.stringify(data))
        .then(function (response) {
          self.dialogConfirm = !self.dialogConfirm
          // success
          if (response.body.status === 'success') {
            self.dialogMessage = this.$t('lang.invite.messages.greatAnEmailHasBeenSent')
          } else if (response.body.status === 'error') {
            self.dialogMessage = this.$t('lang.invite.messages.anInvitationHasAlreadyBeenSent')
          }
        }, function (response) {
          self.dialogConfirm = !self.dialogConfirm
          // error
          console.log('error', response.body.status)
          self.dialogMessage = this.$t('lang.invite.messages.anErrorHappendPleaseRetry')
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
  background-image: url("/static/img/background/background-piggies50.png");
  background-repeat: repeat;
  background-size: 426px 201px;
}

.contribute-button {
  font-size: 42px;
}

.email-form {
  background-color: #f2f2f2;
  border-radius: 15px;
  padding: 20px;
}

</style>
