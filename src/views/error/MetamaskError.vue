<template>
  <div>
    <v-dialog v-model="waitDialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline grey-text">{{ $t('lang.metamask.ongoing') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex sm12>
                <span class="grey--text">
                  {{ waitMessage }}
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

import errorMessagesMixin from '@/mixins/errorMessages'

export default {
  data () {
    return {
    }
  },
  mixins: [
    errorMessagesMixin
  ],
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
      return this.metamaskTitle(this.lockstatus)
    },
    metaMessage: function () {
      return this.metamaskMessage(this.lockstatus) + this.$t('lang.metamask.complement')
    }
  }
}

</script>

<style scoped>

</style>
