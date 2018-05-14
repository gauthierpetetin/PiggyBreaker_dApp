<template>
  <div>
    <v-dialog v-model="waitDialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline grey-text">On-going transaction validation</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex sm12>
                <span class="grey--text">
                  Your previous transaction has been submitted successfully.<br />
                  Please wait 50-60 seconds until it gets validated by the whole network.
                </span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeWaitDialog">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  <v-dialog v-model="metaDialog" persistent max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline grey-text">{{ metaTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex sm12>
              <span class="grey--text" v-html="metaMessage"></span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="closeMetaDialog">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods: {
    closeMetaDialog () {
      this.$emit('metaerror')
    },
    closeWaitDialog () {
      this.$emit('wait')
    }
  },
  props: {
    waitDialog: false,
    metaDialog: false,
    lockstatus: null
  },
  computed: {
    metaTitle: function () {
      let errT = 'Unknown error, please contact support.'
      if (this.lockstatus === 'not_installed') {
        errT = 'No Metamask installed'
      } else if (this.lockstatus === 'locked') {
        errT = 'Metamask locked'
      } else if (this.lockstatus === 'wrong_network') {
        errT = 'Wrong Metamask network'
      }
      return errT
    },
    metaMessage: function () {
      let errM = 'Unknown error, please contact support.'
      if (this.lockstatus === 'not_installed') {
        errM = 'Please install Metamask to play Piggy Breaker!'
      } else if (this.lockstatus === 'locked') {
        errM = 'Please unlock your Metamask to play Piggy Breaker!'
      } else if (this.lockstatus === 'wrong_network') {
        errM = 'Please open Metamask and update the network to play Piggy Breaker!'
      }
      return errM
    }
  }
}

</script>

<style scoped>

</style>
