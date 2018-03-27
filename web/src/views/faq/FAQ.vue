<template>
  <div>

    <section>
          <v-layout
            column
            wrap
            class="my-5"
            align-center
          >
        <v-flex md12 style="width: 100%">
          <v-container grid-list-xl>
            <v-layout row wrap>
              <v-flex md12>
                <h1 class="headline">FAQ</h1>
              </v-flex>
              <v-flex md12>
                <h2>Getting started</h2>
                <v-expansion-panel expand>
                  <v-expansion-panel-content>
                    <div slot="header">What do I need to play Crypto Piggy?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        Here’s what you need to get started:
                        <ul>
                          <li>A computer or laptop running the desktop version of Chrome or Firefox</li>
                          <li>MetaMask, a digital wallet used specifically with web apps</li>
                          <li>Ether, a form of digital payment that powers Crypto Piggy</li>
                        </ul>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                  <v-expansion-panel-content>
                    <div slot="header">Installing MetaMask, your digital wallet</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        To use Crypto Piggy, you will need to install MetaMask, a digital wallet. You will need to put money in it to make your first purchase.
                        <br />
                        <strong>Note:</strong> A digital wallet like MetaMask acts like a bank account—treat it with respect and make sure you don’t forget your password or the seed words.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <h2>Other</h2>
                <v-expansion-panel expand>
                  <v-expansion-panel-content>
                    <div slot="header">Is this a scam?</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        No, this isn’t a scam. Anyone with insider knowledge of Crypto Piggy—like our core development team—is banned from participating. This is to prevent anyone from using their knowledge of the breeding algorithm to create the most valuable kinds of cat.
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
</style>
