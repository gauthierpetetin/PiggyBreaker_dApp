<template>
  <div>

    <v-dialog v-model="dialog" persistent max-width="800px">

      <v-card>
        <v-card-title>
          <!-- <span class="headline grey-text">{{ $t('lang.piggy.contribute.status.contribute') }}</span> -->
          <span class="headline grey-text">{{ $t('lang.welcome.pleaseSignIn') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-flex md12 class="text-xs-center grey-text" style="font-size:28px">
              <img src="/static/img/picto/metamask.png" alt="no metamask" style="max-width: 80px; margin-bottom: 10px">
            </v-flex>
            <v-layout column align-center justify-center style="background-color: white; padding-top: 30px; padding-bottom: 30px" >
              <v-progress-circular :size="60" indeterminate color="warning"></v-progress-circular>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="cancelSignature()">{{ $t('lang.form.button.cancel') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firestoreMixin from '@/mixins/firestore'
import ethereumMixin from '@/mixins/ethereum'
import { eventBus } from '@/main'

export default {
  mixins: [
    firestoreMixin,
    ethereumMixin
  ],
  computed: {
    dialog () {
      return this.$store.state.authenticateDialog
    }
  },
  mounted () {
    // console.log('Signin Vue: Authenticate player')
  },
  methods: {
    cancelSignature () {
      eventBus.$emit('goBackToWelcomePage')
      // this.$store.state.gameStarted = false
      // this.$store.state.authenticated = false
      // this.$store.state.authenticateDialog = false
      // router.push('/')
    }
  }
}
</script>

<style scoped>

.big-contribute-button {
  font-size: 36px;
  height: 75px;
  width: 40% !important;
  margin-bottom: 50px;
}

.normal-contribute-button {
  width: 200px;
}

.small-contribute-button {
  font-size: 12px !important;
  height: 30px;
  width: 170px !important;
}

.disabled-contribute-button {
  background-color: grey !important;
  height: 220px !important;
}

</style>
