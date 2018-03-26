<template>
  <span>

  <section>
    <v-layout
      column
      wrap
      class="my-5"
      align-center
    >
      <v-flex xs12 sm4 class="my-3">
        <div class="text-xs-center">
          <h2 class="headline">What is CryptoIsland ?</h2>
          <span class="subheading">
            The CryptoIsland game requires 5 players and it can be split into 3 phases:
          </span>
        </div>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-xl>
          <v-layout row wrap>
            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center">Phase 1 – Join island</div>
                </v-card-title>
                <v-card-text>
                  During this first phase, the island is recruiting pirates (players).<br />
                  <br />
                  2 things are required for a pirate to join the island :<br />
                  <br />
                  <ul>
                    <li>Buy 100 pieces of wood (against ETH)</li>
                    <li>Indicate the wood contribution (between 0 and 100) offered to the community to build a ship (or rafts) before the storm comes in phase 3 (this wood contribution will be kept secret until phase 2)</li>
                  </ul>
                  <br />
                  <strong>Next phase:</strong> phase 1 is over only once 5 pirates joined the island.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Phase 2 – Build a ship</div>
                </v-card-title>
                <v-card-text>
                  During this first phase, the pirates (players) reveal the wood contribution they decided to offer to the community in phase 1.<br />
                  <br />
                  The wood contributions are used to build a ship (or rafts) and escape the island when the storm comes :<br />
                  <br />
                  <ul>
                    <li>250 pieces of wood are required for a ship.</li>
                    <li>75 pieces of wood are required for a raft.</li>
                  </ul>
                  <br />
                  <strong>Next phase:</strong> phase 2 is over once all pirates revealed their wood contributions OR once the maximum time
                  limit is past.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">

                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center">Phase 3 – Escape storm</div>
                </v-card-title>
                <v-card-text>
                  During this phase, the storm has come and the pirates try to leave the island:<br />
                  <br />
                  <ul>
                    <li>If the pirates built a ship (wood contributions >= 250): all pirates leave the island and survive.</li>
                    <li>If they didn’t build a ship (wood contributions &lt; 250): the pirates build rafts instead (1 raft = 75 pieces of
                  wood). A raft can support one single pirate. The most generous pirates take place on the available rafts, leave
                  the island and survive. On top of that, the pirates are angry and punish the less generous pirate, all his
                  belongings are offered to the most generous pirate as a reward.</li>
                  </ul>
                  <br />
                  <strong>End of game:</strong> Once the storm is over, ship/rafts are sold and the recovered amount is shared equally among all
                  survivors. The pirates go in a tavern and celebrate their survival with bottles of rhum (all pirates who made
                  benefits spend 5% of their benefits).
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </section>
</span>
</template>
