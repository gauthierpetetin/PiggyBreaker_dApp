<template>
  <div>
    <v-btn
      class="mt-3"
      :class="classButton"
      style="background-color: #FFD700;"
      dark
      large
      slot="activator"
      @click.native="contributeDialog()"
    >
      Contribute
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="800px">

      <v-card>
        <v-card-title>
          <span class="headline">Contribute</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md v-if="contributionStatus === 'contributing'">
            <v-layout wrap>
              <v-flex xs12 sm6>
                Your ETH contribution*<br />
                (minimum contribution: {{ game.minContribution }} ETH)
              </v-flex>
              <v-flex xs12 sm2>
                <v-text-field type="number" number
                  v-model="player.contributionValue" required></v-text-field>
              </v-flex>
              <v-flex v-if="contributionError" xs12 sm12>
                <v-alert outline color="error" icon="warning" :value="true">
                  {{ contributionError }}
                </v-alert>
              </v-flex>
              <v-flex xs12 sm12>
                * Your chances to win the lottery are directly proportional to the amount your contribution(s)
              </v-flex>
              <v-flex xs12 sm12>
                <v-btn block color="warning" dark @click.native="contributePiggy()">Contribute</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container grid-list-md v-if="contributionStatus === 'contributed'">
            <v-layout wrap>
              <v-flex xs12 sm6>
                Congratulations! Your contribution has been submitted successfully.<br />
                <br />
                It will require 50-60 seconds until it gets validated by the whole network.
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="contributionStatus === 'contributing'" color="blue darken-1" flat @click.native="dialog = false">Cancel</v-btn>
          <v-btn v-if="contributionStatus === 'contributed'" color="blue darken-1" flat @click.native="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import ethereumMixin from '@/mixins/ethereum'

export default {
  mixins: [ethereumMixin],
  props: {
    buttonLarge: true,
    game: null
  },
  data () {
    return {
      dialog: false,
      contributionStatus: 'contributing',
      contributionError: false
    }
  },
  computed: {
    classButton: function () {
      return {
        'contribute-button': this.buttonLarge
      }
    }
  },
  methods: {
    // Show dialog
    contributeDialog () {
      this.dialog = true
      this.contributionStatus = 'contributing'
    }
  }
}
</script>

<style scoped>

.contribute-button {
  font-size: 42px;
}

</style>
