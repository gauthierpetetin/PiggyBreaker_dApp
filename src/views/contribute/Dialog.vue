<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-btn
      class="mt-3"
      style="background-color: #FFD700;"
      dark
      large
      slot="activator"
      @click.native="contributeDialog()"
    >
      Contribute
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Contribute</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md v-if="contributeStatus === 'contributing'">
          <v-layout wrap>
            <v-flex xs12 sm6>
              Your ETH contribution*<br />
              (minimum contribution: {{ rateLimit }} ETH)
            </v-flex>
            <v-flex xs12 sm2>
              <v-text-field type="number" number
                v-model="contribution" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm12>
              * Your chances to win the lottery are directly proportional to the amount your contribution(s)
            </v-flex>
            <v-flex xs12 sm12>
              <v-flex xs12 sm12>
                <v-btn block color="warning" dark @click.native="contribute()">Contribute</v-btn>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container grid-list-md v-if="contributeStatus === 'contributed'">
          <v-layout wrap>
            <v-flex xs12 sm6>
              Well done!
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  data () {
    return {
      dialog: false,
      contributeStatus: 'contributing',
      rateLimit: 0
    }
  },
}
</script>

<style>

</style>
