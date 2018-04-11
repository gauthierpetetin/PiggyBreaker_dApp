<template>
  <div>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class=" display-2">Invite?</h2>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <img src="/static/img/picto/1-contribute.png" height="200">
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">1. You <strong>contribute</strong> with Ethers</div>
                    </v-card-title>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <img src="/static/img/picto/2-break-piggy.png" height="200">
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">2. <strong>Any contributor</strong> can decide to break the Piggy</div>
                    </v-card-title>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <img src="/static/img/picto/3-random-winner.png" height="200">
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">3. A winner is <strong>chosen randomly</strong> between the contributors**</div>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax  class="parallax-background" height="280">
          <v-layout column align-center justify-center>
            <div class="headline black--text mb-3 text-xs-center">**Your chances to win the lottery are directly proportional to the amount your contribution(s)</div>

          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex sm12 class="my-3">
              <div class="text-xs-center">
                <h2 class=" display-1">Examples</h2>
              </div>
            </v-flex>
            <v-flex xs12 sm6>
              <v-card class="elevation-0 transparent">
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs4>
                      <v-card-media
                        src="/static/img/picto/big-piggy.png"
                        height="125px"
                        contain
                      ></v-card-media>
                    </v-flex>
                    <v-flex xs8>
                      <v-list class="transparent">
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>Piggy value: 40 ETH</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>Your contribution: 20 ETH</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>Your chances to win the lottery: 50%</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
            <v-flex xs12 sm6>
              <v-card class="elevation-0 transparent">
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs4>
                      <v-card-media
                        src="/static/img/picto/big-piggy.png"
                        height="125px"
                        contain
                      ></v-card-media>
                    </v-flex>
                    <v-flex xs8>
                      <v-list class="transparent">
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>Piggy value: 40 ETH</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>Your contribution: 0.4 ETH</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>Your chances to win the lottery: 1%</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>

          </v-layout>
        </v-container>
      </section>

  </div>
</template>

<style>
</style>
